const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DEFAULT_CONFIG = {
  platforms: {},
  image_platforms: {},
  defaults: {
    aspect_ratio: '16:9',
    duration: 15,
    shots_per_15s: 7,
    style: 'auto',
    output_dir: '产物',
    shot_count: 7
  },
  preferences: {
    language: 'zh',
    mood: '',
    platform_order: ['seedance', 'runway', 'kling'],
    image_platform_order: ['gpt_image', 'flux', 'ideogram']
  },
  preset_workflows: [
    { name: '小说转短剧', icon: '📖→🎬', flowFile: 'novel-to-video', default: true },
    { name: '仅出分镜', icon: '🎬', flowFile: 'storyboard-only' },
    { name: '角色设计', icon: '👤', flowFile: 'character-design' },
    { name: '分镜转视频', icon: '🎥', flowFile: 'board-to-video' },
    { name: '一键全来', icon: '⚡', flowFile: 'one-click-all' }
  ],
  custom_workflows: []
};

class ConfigManager {
  constructor(vaultPath) {
    this.vaultPath = vaultPath || process.env.OBSIDIAN_VAULT || process.cwd();
    this.configPath = path.join(this.vaultPath, 'config.yml');
    this.config = null;
  }

  load() {
    if (!fs.existsSync(this.configPath)) {
      this.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      return this.config;
    }
    const raw = fs.readFileSync(this.configPath, 'utf-8');
    const userConfig = yaml.load(raw) || {};
    this.config = this._merge(JSON.parse(JSON.stringify(DEFAULT_CONFIG)), userConfig);
    return this.config;
  }

  save(newConfig) {
    this.config = this._merge(this.config || this.load(), newConfig);
    const yamlStr = yaml.dump(this.config, { indent: 2, lineWidth: 120, noRefs: true });
    fs.writeFileSync(this.configPath, yamlStr, 'utf-8');
    return this.config;
  }

  get(key) {
    if (!this.config) this.load();
    return key ? this._getNested(this.config, key) : this.config;
  }

  getPlatformKey(platformName) {
    const config = this.get();
    return config.platforms?.[platformName]?.key || config.image_platforms?.[platformName]?.key || null;
  }

  _merge(base, override) {
    const result = { ...base };
    for (const key of Object.keys(override)) {
      if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
        result[key] = this._merge(base[key] || {}, override[key]);
      } else {
        result[key] = override[key];
      }
    }
    return result;
  }

  _getNested(obj, pathStr) {
    return pathStr.split('.').reduce((o, k) => (o || {})[k], obj);
  }
}

module.exports = ConfigManager;
