const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

class VaultReader {
  constructor(vaultPath) {
    this.vaultPath = vaultPath || process.env.OBSIDIAN_VAULT || process.cwd();
  }

  scanDir(relativePath = '') {
    const fullPath = path.join(this.vaultPath, relativePath);
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    return entries
      .filter(e => !e.name.startsWith('.') && !e.name.startsWith('_'))
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      })
      .map(e => {
        const entryPath = relativePath ? `${relativePath}/${e.name}` : e.name;
        if (e.isDirectory()) {
          return { name: e.name, type: 'dir', path: entryPath, children: this.scanDir(entryPath) };
        }
        if (e.name.endsWith('.md')) {
          const stat = fs.statSync(path.join(fullPath, e.name));
          const content = fs.readFileSync(path.join(fullPath, e.name), 'utf-8');
          const charCount = content.replace(/\s/g, '').length;
          return { name: e.name.replace('.md', ''), type: 'file', path: entryPath, charCount, size: stat.size };
        }
        return null;
      })
      .filter(Boolean);
  }

  readFile(relativePath) {
    const fullPath = path.join(this.vaultPath, relativePath);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const parsed = matter(raw);
    return { content: parsed.content, frontmatter: parsed.data, raw };
  }

  findFiles(pattern, baseDir = '') {
    const results = [];
    const fullPath = path.join(this.vaultPath, baseDir);
    function walk(dir, accPath) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        const relPath = accPath ? `${accPath}/${e.name}` : e.name;
        if (e.isDirectory()) { walk(path.join(dir, e.name), relPath); }
        else if (pattern.test(e.name)) { results.push(relPath); }
      }
    }
    walk(fullPath, baseDir);
    return results;
  }

  scanProject(projectDir) {
    const chapters = [];
    const characters = [];
    const scenes = [];
    const fullPath = path.join(this.vaultPath, projectDir);

    if (!fs.existsSync(fullPath)) return { chapters, characters, scenes };

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) {
        if (e.name === '角色' || e.name === 'characters') {
          const charDir = path.join(fullPath, e.name);
          if (fs.existsSync(charDir)) {
            fs.readdirSync(charDir).filter(f => f.endsWith('.md')).forEach(f => {
              const data = this.readFile(`${projectDir}/${e.name}/${f}`);
              characters.push({ name: f.replace('.md', ''), path: `${projectDir}/${e.name}/${f}`, frontmatter: data.frontmatter });
            });
          }
        } else if (e.name === '场景' || e.name === 'scenes') {
          const sceneDir = path.join(fullPath, e.name);
          if (fs.existsSync(sceneDir)) {
            fs.readdirSync(sceneDir).filter(f => f.endsWith('.md')).forEach(f => {
              const data = this.readFile(`${projectDir}/${e.name}/${f}`);
              scenes.push({ name: f.replace('.md', ''), path: `${projectDir}/${e.name}/${f}`, frontmatter: data.frontmatter });
            });
          }
        }
      } else if (e.name.endsWith('.md') && !e.name.startsWith('_')) {
        const data = this.readFile(`${projectDir}/${e.name}`);
        chapters.push({
          name: e.name.replace('.md', ''),
          path: `${projectDir}/${e.name}`,
          frontmatter: data.frontmatter,
          charCount: data.content.replace(/\s/g, '').length
        });
      }
    }
    chapters.sort((a, b) => a.name.localeCompare(b.name));
    return { chapters, characters, scenes };
  }
}

module.exports = VaultReader;
