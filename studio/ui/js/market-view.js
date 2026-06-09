// market-view.js — 故事板市场（主界面）
const STYLES = [
  { id: 1, name: '黑金动作', emoji: '⚔️', cat: '动作科幻', color: '#1a1a1a', accent: '#d4a843' },
  { id: 2, name: '科幻机甲', emoji: '🤖', cat: '动作科幻', color: '#0a1a2e', accent: '#4dc9f6' },
  { id: 9, name: '蒸汽朋克', emoji: '⚙️', cat: '动作科幻', color: '#2d1f14', accent: '#c8956c' },
  { id: 24, name: '好莱坞商业大片', emoji: '💥', cat: '动作科幻', color: '#0a1a2e', accent: '#ff4400' },
  { id: 35, name: '暗黑科幻', emoji: '👽', cat: '动作科幻', color: '#0a0a0a', accent: '#00ff88' },
  { id: 50, name: '故障艺术 Glitch', emoji: '📺', cat: '动作科幻', color: '#0a0a0a', accent: '#ff00ff' },

  { id: 3, name: '东方玄幻', emoji: '🐉', cat: '东方美学', color: '#1a0a0a', accent: '#e8a850' },
  { id: 8, name: '宫廷权谋', emoji: '👑', cat: '东方美学', color: '#1a0a0a', accent: '#c9a84c' },
  { id: 19, name: '新中式国潮', emoji: '🏮', cat: '东方美学', color: '#cc0000', accent: '#ffd700' },
  { id: 28, name: '张艺谋色彩', emoji: '🔴', cat: '东方美学', color: '#8b0000', accent: '#ffd700' },
  { id: 32, name: '中国水墨意境', emoji: '🖌️', cat: '东方美学', color: '#f5f0e8', accent: '#2d2d2d' },
  { id: 43, name: '中国水墨动画', emoji: '🐼', cat: '东方美学', color: '#f5f0e0', accent: '#2d2d2d' },
  { id: 47, name: '剪纸中国风', emoji: '✂️', cat: '东方美学', color: '#cc0000', accent: '#ffd700' },
  { id: 16, name: '赛博佛学', emoji: '🧘', cat: '东方美学', color: '#1a0a2e', accent: '#ff6600' },
  { id: 34, name: '赛博佛学朋克', emoji: '💻', cat: '东方美学', color: '#0a0a2e', accent: '#ff8800' },

  { id: 4, name: '悬疑惊悚', emoji: '🔍', cat: '悬疑暗黑', color: '#0f0f0f', accent: '#c0392b' },
  { id: 7, name: '废土末日', emoji: '🏚️', cat: '悬疑暗黑', color: '#3d3025', accent: '#e07020' },
  { id: 20, name: '暗黑哥特', emoji: '🦇', cat: '悬疑暗黑', color: '#0a0a0a', accent: '#8b0000' },
  { id: 26, name: 'Tim Burton 哥特', emoji: '🌙', cat: '悬疑暗黑', color: '#1a1a2e', accent: '#8b5cf6' },
  { id: 29, name: '韩国犯罪美学', emoji: '🔪', cat: '悬疑暗黑', color: '#1a1a2e', accent: '#4a90d9' },
  { id: 36, name: '废土末日生存', emoji: '☢️', cat: '悬疑暗黑', color: '#3d3025', accent: '#ff4400' },
  { id: 39, name: '悬疑惊悚导演', emoji: '🎬', cat: '悬疑暗黑', color: '#0f0f0f', accent: '#c0392b' },
  { id: 40, name: '心理迷宫', emoji: '🧩', cat: '悬疑暗黑', color: '#1a1a2e', accent: '#9b59b6' },

  { id: 10, name: '童话绘本', emoji: '📖', cat: '动漫童话', color: '#f0f8e8', accent: '#7ec8a0' },
  { id: 11, name: '二次元动漫', emoji: '🎌', cat: '动漫童话', color: '#fff0f5', accent: '#ff69b4' },
  { id: 21, name: 'Disney Pixar 3D', emoji: '✨', cat: '动漫童话', color: '#1a3d5e', accent: '#ffcc00' },
  { id: 22, name: 'Disney 2D 手绘', emoji: '🎨', cat: '动漫童话', color: '#faf0e6', accent: '#4169e1' },
  { id: 23, name: 'Studio Ghibli', emoji: '🌿', cat: '动漫童话', color: '#e8f4e0', accent: '#5b8c5a' },
  { id: 44, name: '像素复古游戏', emoji: '👾', cat: '动漫童话', color: '#0a2e0a', accent: '#00ff00' },
  { id: 45, name: '黏土定格动画', emoji: '🧱', cat: '动漫童话', color: '#e8d5b7', accent: '#8b6914' },

  { id: 5, name: '都市情绪', emoji: '🌆', cat: '文艺情绪', color: '#1a1a2e', accent: '#e858a0' },
  { id: 6, name: '青春校园', emoji: '🌸', cat: '文艺情绪', color: '#fef9ef', accent: '#ff9aa2' },
  { id: 27, name: '王家卫情绪', emoji: '💨', cat: '文艺情绪', color: '#0a1a1a', accent: '#ff0066' },
  { id: 31, name: '欧洲艺术电影', emoji: '🎭', cat: '文艺情绪', color: '#2d2d2d', accent: '#8b7355' },
  { id: 33, name: '新浪潮自由', emoji: '🎞️', cat: '文艺情绪', color: '#2d2d1a', accent: '#e07070' },
  { id: 37, name: '都市情绪电影', emoji: '🌃', cat: '文艺情绪', color: '#0a0a2e', accent: '#e8a0a0' },
  { id: 38, name: '青春校园物语', emoji: '📚', cat: '文艺情绪', color: '#f5f0e8', accent: '#88b8e8' },
  { id: 41, name: '浪漫梦幻', emoji: '💕', cat: '文艺情绪', color: '#faf0f5', accent: '#ff69b4' },

  { id: 12, name: '写实摄影', emoji: '📷', cat: '地域文化', color: '#2d2d2d', accent: '#888888' },
  { id: 13, name: '复古胶片', emoji: '📽️', cat: '地域文化', color: '#3d2a1a', accent: '#d4a574' },
  { id: 14, name: '北欧极简', emoji: '❄️', cat: '地域文化', color: '#f5f5f5', accent: '#88c0d0' },
  { id: 15, name: '拉美魔幻', emoji: '🦋', cat: '地域文化', color: '#1a3d2e', accent: '#ff6b35' },
  { id: 17, name: '中世纪史诗', emoji: '🏰', cat: '地域文化', color: '#2d2d1a', accent: '#8b7355' },
  { id: 18, name: '非洲部落', emoji: '🥁', cat: '地域文化', color: '#3d2010', accent: '#e8a040' },
  { id: 30, name: '印度宝莱坞', emoji: '🕺', cat: '地域文化', color: '#1a0a2e', accent: '#ff6600' },
  { id: 48, name: '浮世绘日本', emoji: '🗾', cat: '地域文化', color: '#f5e6d3', accent: '#1a3d7e' },

  { id: 25, name: 'Wes Anderson', emoji: '🎀', cat: '概念实验', color: '#f5e6d3', accent: '#e8a0c0' },
  { id: 42, name: '音乐 MV', emoji: '🎵', cat: '概念实验', color: '#0a0a0a', accent: '#ff0066' },
  { id: 46, name: '沙画叙事', emoji: '🏜️', cat: '概念实验', color: '#d4b896', accent: '#8b6914' },
  { id: 49, name: '极简主义', emoji: '⬜', cat: '概念实验', color: '#ffffff', accent: '#2d2d2d' },
  { id: 51, name: '超现实主义', emoji: '🫧', cat: '概念实验', color: '#1a0a2e', accent: '#ff8800' },
  { id: 52, name: '广告大片质感', emoji: '💎', cat: '概念实验', color: '#0a0a0a', accent: '#ffd700' },
  { id: 53, name: '粗粝 B 级片', emoji: '🧟', cat: '概念实验', color: '#2d1a0a', accent: '#ff4400' }
];

const STYLE_CATEGORIES = ['东方美学', '动作科幻', '悬疑暗黑', '动漫童话', '文艺情绪', '地域文化', '概念实验'];

class MarketView {
  constructor() {
    this.selectedStyle = null;
    this.selectedStyles = [];
    this.storyText = '';
    this.workflowId = null;
    this.nodeStatus = {};
    this.unsubscribe = null;
  }

  render() {
    this.renderRecommendations();
    this._bindStoryInput();
    this.updateButtonState();
  }

  // ---- Style Gallery (by category) ----
  toggleGallery() {
    const gallery = document.getElementById('styleGallery');
    const arrow = document.getElementById('galleryArrow');
    if (!gallery) return;
    const isHidden = gallery.style.display === 'none';
    gallery.style.display = isHidden ? 'flex' : 'none';
    if (arrow) arrow.textContent = isHidden ? '▼' : '▶';
    if (isHidden && gallery.children.length === 0) this.renderStyleGallery();
  }

  renderStyleGallery() {
    const gallery = document.getElementById('styleGallery');
    if (!gallery) return;

    gallery.innerHTML = STYLE_CATEGORIES.map(cat => {
      const styles = STYLES.filter(s => s.cat === cat);
      if (styles.length === 0) return '';
      return `
        <div class="style-category">
          <div class="style-cat-header">${cat} <span>${styles.length}</span></div>
          <div class="style-cat-grid">
            ${styles.map(s => `
              <div class="style-card ${this.selectedStyle === s.id ? 'selected' : ''}"
                   data-style-id="${s.id}"
                   style="--card-bg:${s.color}; --card-accent:${s.accent}"
                   onclick="window.marketView.selectStyle(${s.id})">
                <div class="style-card-emoji">${s.emoji}</div>
                <div class="style-card-name">${s.name}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
    }).join('');
  }

  selectStyle(id) {
    if (this.selectedStyle === id) {
      this.selectedStyle = null;
    } else {
      this.selectedStyle = id;
    }
    // Auto-open & render gallery when selecting
    const gallery = document.getElementById('styleGallery');
    if (gallery && gallery.style.display === 'none') {
      gallery.style.display = 'flex';
      const arrow = document.getElementById('galleryArrow');
      if (arrow) arrow.textContent = '▼';
    }
    this.renderStyleGallery();
    this.updateButtonState();
    this.renderRecommendations();
  }

  // ---- Story Input ----
  _bindStoryInput() {
    const input = document.getElementById('storyInput');
    if (!input || input.dataset.studioBound) return;
    input.dataset.studioBound = '1';

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.storyText = input.value.trim();
        if (this.storyText.length >= 5) {
          this.renderRecommendations();
        }
      }, 800);
    });
  }

  // ---- Recommendations (simple curated picks) ----
  renderRecommendations() {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;

    const story = (this.storyText || document.getElementById('storyInput')?.value?.trim() || '');
    if (story.length < 5) { container.style.display = 'none'; return; }

    const lower = story.toLowerCase();
    // Quick tone detection for better picks
    const isChinese = /[一-鿿]/.test(story);
    const hasAction = /战|杀|剑|刀|打|冲|击|破|灭|毁|爆|血/.test(story);
    const hasEmotion = /爱|情|心|泪|哭|笑|温柔|孤独|寂寞/.test(story);
    const hasDark = /鬼|死|暗|血|尸|恐怖|阴|黑/.test(story);

    let picks;
    if (hasAction && isChinese) {
      picks = [
        { ...STYLES.find(s => s.id === 1), desc: '动作冲突首选' },
        { ...STYLES.find(s => s.id === 3), desc: '东方叙事质感' },
        { ...STYLES.find(s => s.id === 28), desc: '极致色彩张力' }
      ];
    } else if (hasEmotion) {
      picks = [
        { ...STYLES.find(s => s.id === 27), desc: '情绪霓虹氛围' },
        { ...STYLES.find(s => s.id === 5), desc: '都市情感基调' },
        { ...STYLES.find(s => s.id === 41), desc: '浪漫梦幻质感' }
      ];
    } else if (hasDark) {
      picks = [
        { ...STYLES.find(s => s.id === 4), desc: '悬疑暗调氛围' },
        { ...STYLES.find(s => s.id === 40), desc: '心理空间呈现' },
        { ...STYLES.find(s => s.id === 20), desc: '哥特暗黑美学' }
      ];
    } else {
      picks = [
        { ...STYLES.find(s => s.id === 3), desc: '东方美学首选' },
        { ...STYLES.find(s => s.id === 23), desc: '治愈温暖质感' },
        { ...STYLES.find(s => s.id === 24), desc: '电影级大片感' }
      ];
    }

    container.style.display = 'block';
    container.innerHTML = `
      <div class="section-header">
        <h2>🎯 热门推荐</h2>
        <span class="section-hint">根据故事氛围精选</span>
      </div>
      <div class="rec-cards">
        ${picks.map((r, i) => `
          <div class="rec-card ${i === 0 ? 'rec-primary' : ''} ${this.selectedStyle === r.id ? 'rec-selected' : ''}"
               onclick="window.marketView.selectStyle(${r.id})">
            <div class="rec-style">
              <span class="rec-emoji">${r.emoji}</span>
              <span class="rec-name">${r.name}</span>
            </div>
            <div class="rec-reason">${r.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ---- Button State ----
  updateButtonState() {
    const btnGen = document.getElementById('btnGenerate');
    const btnAll = document.getElementById('btnAllInOne');
    const status = document.getElementById('selectionStatus');

    if (this.selectedStyle) {
      const style = STYLES.find(s => s.id === this.selectedStyle);
      if (btnGen) btnGen.disabled = false;
      if (btnAll) btnAll.disabled = false;
      if (status) status.textContent = `✅ 已选：${style?.name || '#' + this.selectedStyle}`;
    } else {
      if (btnGen) btnGen.disabled = true;
      if (btnAll) btnAll.disabled = true;
      if (status) status.textContent = '👆 先选一个风格';
    }
  }

  // ---- Generate ----
  async generateStoryboard() {
    if (!this.selectedStyle) { showToast('👆 请先选择风格'); return; }
    const story = document.getElementById('storyInput')?.value?.trim() || '';
    if (!story) { showToast('📝 请先粘贴故事'); return; }
    const style = STYLES.find(s => s.id === this.selectedStyle);
    await this._submitAndWait('generate', {
      story,
      style: { id: style.id, name: style.name, emoji: style.emoji },
      shots: 7, aspect: '16:9'
    });
  }

  async generateAll() {
    if (!this.selectedStyle) { showToast('👆 请先选择风格'); return; }
    const story = document.getElementById('storyInput')?.value?.trim() || '';
    if (!story) { showToast('📝 请先粘贴故事'); return; }
    const style = STYLES.find(s => s.id === this.selectedStyle);
    await this._submitAndWait('generate', {
      story,
      style: { id: style.id, name: style.name, emoji: style.emoji },
      mode: 'allinone', shots: 7, aspect: '16:9'
    });
  }

  async _submitAndWait(type, payload) {
    const area = document.getElementById('outputArea');
    const grid = document.getElementById('outputGrid');
    if (!area || !grid) return;
    area.style.display = 'block';
    grid.innerHTML = '<div class="result-card"><div class="result-body" style="text-align:center;padding:32px">⏳ 等待 AI 处理...</div></div>';

    try {
      const resp = await fetch(`${api.base}/api/chat/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const { taskId } = await resp.json();

      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 1000));
        const tr = await fetch(`${api.base}/api/chat/task/${taskId}`);
        if (!tr.ok) continue;
        const task = await tr.json();
        if (task.status === 'done' && task.result) {
          this._renderAIResult(task.result, payload);
          return;
        }
      }
      grid.innerHTML = '<div class="result-card"><div class="result-body" style="text-align:center;padding:32px">⏰ 等待超时，请对 CC 说「处理画布任务」</div></div>';
    } catch (e) {
      grid.innerHTML = `<div class="result-card"><div class="result-body" style="text-align:center;padding:32px">❌ ${e.message}</div></div>`;
    }
  }

  _renderAIResult(result, payload) {
    const grid = document.getElementById('outputGrid');
    if (!grid) return;
    const style = payload.style;
    grid.innerHTML = `
      <div class="result-card">
        <div class="result-header"><span class="result-icon">${style.emoji}</span>${style.name} · AI 生成结果</div>
        <div class="result-body">
          <div class="result-row"><b>风格</b> ${style.emoji} ${style.name}</div>
          <div class="result-row"><b>画幅</b> ${payload.aspect}</div>
          <div class="result-row"><b>分镜</b> ${payload.shots}镜</div>
          ${result.prompt ? `<div class="result-story"><pre style="white-space:pre-wrap;font-family:inherit;font-size:13px">${result.prompt}</pre></div>` : ''}
          ${result.storyboard ? `<div class="result-story"><pre style="white-space:pre-wrap;font-family:inherit;font-size:13px">${result.storyboard}</pre></div>` : ''}
        </div>
      </div>
    `;
  }

  // ---- Save ----
  saveWork() {
    const story = document.getElementById('storyInput')?.value?.trim() || '';
    const style = this.selectedStyle ? STYLES.find(s => s.id === this.selectedStyle) : null;

    if (!story && !style) { alert('请先输入故事或选择风格'); return; }

    // Build a markdown document
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let md = `# 故事板 — ${now}\n\n`;
    if (style) md += `**风格**: ${style.name} (${style.emoji})\n\n`;
    if (story) md += `## 故事\n\n${story}\n\n`;
    md += `## 生成配置\n\n`;
    md += `- 风格: ${style ? style.name : '未选'}\n`;
    md += `- 时间: ${now}\n`;
    md += `---\n`;

    // Download as .md file
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `storyboard_${now.replace(/[: ]/g, '_').slice(0, 16)}.md`;
    a.click();
    URL.revokeObjectURL(url);

    const status = document.getElementById('selectionStatus');
    if (status) { status.textContent = '✅ 已保存到本地'; setTimeout(() => this.updateButtonState(), 2000); }
  }
}

window.marketView = new MarketView();
