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

// Full keyword→style mapping (from SKILL.md Step 2 推荐引擎)
// Each entry: [keyword, styleId, formatLabel]
const STYLE_KEYWORDS = [
  ['修仙',3,'全案板'],['古风',3,'角色卡'],['神魔',3,'全案板'],['仙侠',3,'全案板'],['玄幻',3,'全案板'],
  ['武侠',1,'全案板'],['复仇',1,'关键帧'],['谍战',1,'全案板'],['格斗',1,'关键帧'],['战争',1,'全案板'],
  ['机甲',2,'全案板'],['赛博',2,'场景概念卡'],['未来',2,'全案板'],['AI',2,'场景概念卡'],['太空',2,'全案板'],
  ['悬疑',4,'快速故事板'],['密室',4,'情绪板'],['犯罪',4,'快速故事板'],['恐怖',4,'情绪板'],['惊悚',4,'情绪板'],
  ['都市',5,'场景概念卡'],['爱情',5,'情绪板'],['职场',5,'场景概念卡'],['家庭',5,'情绪板'],['暧昧',5,'情绪板'],
  ['校园',6,'四格漫画'],['青春',6,'角色卡'],['初恋',6,'四格漫画'],['成长',6,'角色卡'],
  ['末日',7,'全案板'],['废土',7,'快速故事板'],['丧尸',7,'全案板'],
  ['宫斗',8,'全案板'],['古装',8,'角色卡'],['权谋',8,'全案板'],['帝王',8,'全案板'],
  ['蒸汽',9,'场景概念卡'],['机械',9,'海报'],['维多利亚',9,'场景概念卡'],
  ['童话',10,'情绪板'],['魔法',10,'四格漫画'],['森林',10,'情绪板'],['动物',10,'四格漫画'],
  ['日漫',11,'漫画分镜'],['轻小说',11,'角色卡'],['异世界',11,'漫画分镜'],['学园',11,'漫画分镜'],
  ['纪实',12,'场景概念卡'],['纪录片',12,'情绪板'],['真实',12,'情绪板'],['人物',12,'场景概念卡'],
  ['怀旧',13,'海报'],['黑帮',13,'情绪板'],['年代',13,'海报'],['老上海',13,'海报'],
  ['北欧',14,'场景概念卡'],['维京',14,'海报'],['冰雪',14,'场景概念卡'],['神话',14,'海报'],
  ['拉美',15,'全案板'],['魔幻',15,'情绪板'],['热带',15,'情绪板'],['亡灵',15,'情绪板'],
  ['赛博+东方',16,'场景概念卡'],['寺庙',16,'场景概念卡'],['AI悟道',16,'全案板'],
  ['骑士',17,'全案板'],['城堡',17,'关键帧'],['龙族',17,'全案板'],['魔法战争',17,'关键帧'],
  ['非洲',18,'场景概念卡'],['部落',18,'情绪板'],['草原',18,'情绪板'],['原始',18,'场景概念卡'],
  ['国潮',19,'海报'],['国风',19,'情绪板'],['非遗',19,'海报'],['潮流',19,'情绪板'],
  ['哥特',20,'场景概念卡'],['吸血鬼',20,'海报'],['宗教',20,'场景概念卡'],['暗黑',20,'海报'],
  ['迪士尼',21,'全案板'],['Pixar',21,'角色卡'],['3D',21,'全案板'],['动画',21,'全案板'],
  ['歌舞',22,'漫画分镜'],['手绘',22,'海报'],['迪士尼2D',22,'海报'],
  ['吉卜力',23,'场景概念卡'],['宫崎骏',23,'情绪板'],['治愈',23,'场景概念卡'],
  ['超英',24,'全案板'],['Marvel',24,'关键帧'],['DC',24,'关键帧'],['英雄',24,'全案板'],
  ['对称',25,'情绪板'],['粉彩',25,'海报'],['文艺',25,'情绪板'],['复古',25,'海报'],
  ['哥特童话',26,'场景概念卡'],['扭曲',26,'海报'],['月光',26,'场景概念卡'],
  ['霓虹',27,'场景概念卡'],['香港',27,'海报'],['慢门',27,'场景概念卡'],['浓烈',27,'海报'],
  ['红色',28,'全案板'],['中国',28,'海报'],['色彩',28,'全案板'],
  ['冷峻',29,'快速故事板'],['韩国',29,'场景概念卡'],['犯罪美学',29,'快速故事板'],
  ['宝莱坞',30,'全案板'],['歌舞',30,'海报'],['印度',30,'全案板'],['戏剧',30,'海报'],
  ['欧洲',31,'场景概念卡'],['长镜头',31,'情绪板'],['极简',31,'情绪板'],['文艺片',31,'情绪板'],
  ['水墨',32,'场景概念卡'],['留白',32,'情绪板'],['山水',32,'场景概念卡'],['意境',32,'情绪板'],
  ['新浪潮',33,'快速故事板'],['跳接',33,'情绪板'],['实验',33,'情绪板'],
  ['赛博佛学',34,'场景概念卡'],['佛学科技',34,'全案板'],
  ['太空恐怖',35,'全案板'],['AI失控',35,'关键帧'],['异形',35,'关键帧'],
  ['废土末日',36,'快速故事板'],['求生',36,'全案板'],
  ['都市文艺',37,'场景概念卡'],['情绪电影',37,'情绪板'],
  ['校园物语',38,'角色卡'],['运动',38,'四格漫画'],
  ['心理惊悚',39,'快速故事板'],['犯罪心理',39,'情绪板'],
  ['人格分裂',40,'场景概念卡'],['记忆',40,'情绪板'],['心理',40,'场景概念卡'],
  ['浪漫',41,'海报'],['求婚',41,'情绪板'],['星空',41,'海报'],['梦幻',41,'情绪板'],
  ['音乐',42,'关键帧'],['MV',42,'全案板'],['演唱会',42,'关键帧'],['舞蹈',42,'关键帧'],
  ['水墨动画',43,'场景概念卡'],['国风短片',43,'漫画分镜'],
  ['像素',44,'漫画分镜'],['8bit',44,'四格'],['游戏',44,'漫画分镜'],
  ['黏土',45,'全案板'],['定格',45,'角色卡'],['手工',45,'角色卡'],
  ['沙画',46,'全案板'],['创意',46,'情绪板'],['叙事',46,'情绪板'],
  ['剪纸',47,'漫画分镜'],['中国风',47,'海报'],
  ['浮世绘',48,'场景概念卡'],['江户',48,'漫画分镜'],['日本',48,'场景概念卡'],
  ['极简主义',49,'海报'],['广告',49,'情绪板'],['概念',49,'海报'],['产品',49,'情绪板'],
  ['故障',50,'场景概念卡'],['Glitch',50,'关键帧'],['数字',50,'场景概念卡'],
  ['梦境',51,'场景概念卡'],['潜意识',51,'情绪板'],['超现实',51,'情绪板'],
  ['奢侈品',52,'海报'],['高端',52,'角色卡'],['时尚',52,'海报'],['品牌',52,'角色卡'],
  ['Cult',53,'快速故事板'],['B级',53,'情绪板'],['另类',53,'情绪板']
];

const FORMAT_MAP = {
  '全案板': 1, '快速故事板': 2, '角色卡': 3, '场景概念卡': 4,
  '海报': 5, '漫画分镜': 6, '情绪板': 7, '四格漫画': 8, '关键帧': 10
};

// Story type → mood and default format
const STORY_MOOD = {
  '爱情': { mood: '更甜', desc: '柔和光线，暖色调，浅景深' },
  '复仇': { mood: '更燃', desc: '高对比，冷色与暖色对撞' },
  '恐怖': { mood: '更恐怖', desc: '低亮度，冷色调，强烈阴影' },
  '治愈': { mood: '更治愈', desc: '柔光，暖色，自然光' },
  '史诗': { mood: '更史诗', desc: '广角，宏大构图，金色光线' },
  '悬疑': { mood: '更紧张', desc: '暗调，有限光源，不祥氛围' },
  '暧昧': { mood: '更暧昧', desc: '柔焦，霓虹光，近距离特写' }
};

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
    // Gallery renders lazily on toggle (hidden by default)
    this.renderRecommendations();
    this._bindStoryInput();
    this.updateButtonState();
    // Sidebar renders independently via sidebar-tools.js
    if (typeof window.sidebarTools?.render === 'function') window.sidebarTools.render();
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
    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.storyText = input.value.trim();
        if (this.storyText.length > 10) {
          this.renderRecommendations();
        }
      }, 800);
    });
  }

  // ---- AI Recommendations ----
  renderRecommendations() {
    const container = document.getElementById('aiRecommendations');
    if (!container) return;

    const story = (this.storyText || document.getElementById('storyInput')?.value?.trim() || '').toLowerCase();

    if (story.length < 10) {
      container.style.display = 'none';
      return;
    }

    // Score each style by keyword matches
    const scores = new Map();
    const formats = new Map();
    for (const [keyword, styleId, formatLabel] of STYLE_KEYWORDS) {
      if (story.includes(keyword)) {
        scores.set(styleId, (scores.get(styleId) || 0) + 1);
        if (!formats.has(styleId)) formats.set(styleId, formatLabel);
      }
    }

    // Sort by score descending, take top 4 unique styles
    const topIds = [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([id]) => id);

    // Detect story mood
    let mood = null;
    for (const [moodKeyword, moodData] of Object.entries(STORY_MOOD)) {
      if (story.includes(moodKeyword)) { mood = moodData; break; }
    }

    let recs;
    if (topIds.length > 0) {
      recs = topIds.map(id => {
        const style = STYLES.find(s => s.id === id);
        const format = formats.get(id) || '全案板';
        const matchCount = scores.get(id);
        const reason = this._buildReason(id, matchCount, format, story);
        return { ...style, format, reason, matchCount };
      });
    } else {
      // Fallback for stories without clear keyword matches
      const charLen = story.replace(/\s/g, '').length;
      if (charLen > 500) {
        recs = [
          { ...STYLES[2], format: '全案板', reason: '长篇故事，叙事宏大，东方玄幻给你最佳视觉', matchCount: 0 },
          { ...STYLES[28], format: '海报', reason: '故事有强烈的中国元素，张艺谋式色彩叙事', matchCount: 0 },
          { ...STYLES[1], format: '全案板', reason: '冲突驱动，黑金动作风格突出张力', matchCount: 0 }
        ];
      } else {
        recs = [
          { ...STYLES[5], format: '情绪板', reason: '篇幅精炼，都市情绪风格更聚焦氛围', matchCount: 0 },
          { ...STYLES[49], format: '海报', reason: '概念性强，极简主义让视觉更纯粹', matchCount: 0 },
          { ...STYLES[31], format: '情绪板', reason: '文艺气质，欧洲艺术电影风格', matchCount: 0 }
        ];
      }
    }

    container.style.display = 'block';
    container.innerHTML = `
      <div class="section-header">
        <h2>🤖 AI 推荐</h2>
        <span class="section-hint">
          根据故事自动匹配风格 + 格式
          ${mood ? ` · 💡 建议情绪：<b>${mood.mood}</b>（${mood.desc}）` : ''}
        </span>
      </div>
      <div class="rec-cards">
        ${recs.map((r, i) => `
          <div class="rec-card ${i === 0 ? 'rec-primary' : ''} ${this.selectedStyle === r.id ? 'rec-selected' : ''}"
               onclick="window.marketView.selectStyle(${r.id})">
            <div class="rec-rank">${i === 0 ? '⭐ 最推荐' : i === 1 ? '🥈 备选' : i === 2 ? '🥉 不同视角' : '💡 尝试'}</div>
            <div class="rec-style">
              <span class="rec-emoji">${r.emoji}</span>
              <div>
                <span class="rec-name">${r.name}</span>
                <span class="rec-format">+ ${r.format}</span>
              </div>
              ${r.matchCount > 0 ? `<span class="rec-score" title="关键词匹配数">${r.matchCount}项匹配</span>` : ''}
            </div>
            <div class="rec-reason">${r.reason}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  _buildReason(styleId, matchCount, format, story) {
    const style = STYLES.find(s => s.id === styleId);
    const base = `故事关键词匹配「${style?.name}」风格`;

    const extras = [];
    if (story.includes('雨')) extras.push('雨景氛围');
    if (story.includes('夜')) extras.push('夜景光线');
    if (story.includes('剑') || story.includes('刀') || story.includes('武器')) extras.push('武器特写');
    if (story.includes('对峙') || story.includes('对决') || story.includes('战斗')) extras.push('高速运镜');
    if (story.includes('哭') || story.includes('泪')) extras.push('情绪特写');
    if (story.includes('天') && story.includes('地')) extras.push('场面宏大');

    const recFormat = `推荐输出 <b>${format}</b>`;
    if (extras.length > 0) {
      return `${base}。${recFormat}。额外提示：${extras.join('、')}`;
    }
    return `${base}。${recFormat}`;
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
    if (!this.selectedStyle) return;
    const story = document.getElementById('storyInput')?.value?.trim() || '';
    if (!story) { alert('请先粘贴故事'); return; }

    this._showOutput();

    // Subscribe to progress
    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = window.onProgress((data) => {
      if (data.nodeId) {
        this.nodeStatus[data.nodeId] = data;
        this._updateOutput(data);
      }
    });

    try {
      const styleName = STYLES.find(s => s.id === this.selectedStyle);
      const result = await api.startWorkflow({
        flowFile: 'storyboard-only',
        pastedStory: story,
        style: styleName ? `${styleName.emoji} ${styleName.name}` : `VS${this.selectedStyle}`,
        shotCount: 7
      });
      this.workflowId = result.workflowId;
      if (result.plan) this._renderOutputSteps(result.plan);
    } catch (e) {
      this._showOutputError(e.message);
    }
  }

  async generateAll() {
    if (!this.selectedStyle) return;
    const story = document.getElementById('storyInput')?.value?.trim() || '';
    if (!story) { alert('请先粘贴故事'); return; }

    this._showOutput();
    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = window.onProgress((data) => {
      if (data.nodeId) {
        this.nodeStatus[data.nodeId] = data;
        this._updateOutput(data);
      }
    });

    try {
      const styleName = STYLES.find(s => s.id === this.selectedStyle);
      const result = await api.startWorkflow({
        flowFile: 'one-click-all',
        pastedStory: story,
        style: styleName ? `${styleName.emoji} ${styleName.name}` : `VS${this.selectedStyle}`
      });
      this.workflowId = result.workflowId;
      if (result.plan) this._renderOutputSteps(result.plan);
    } catch (e) {
      this._showOutputError(e.message);
    }
  }

  _showOutput() {
    const area = document.getElementById('outputArea');
    if (area) area.style.display = 'block';
  }

  _renderOutputSteps(plan) {
    const grid = document.getElementById('outputGrid');
    if (!grid) return;

    grid.innerHTML = plan.map(phase =>
      (phase.nodes || []).map(n => {
        const isGenerate = n.type && n.type.startsWith('generate_');
        return `
          <div class="output-card ${isGenerate ? 'output-prompt' : ''}" id="out-${n.id}">
            <div class="output-status">⏳</div>
            <div class="output-label">${n.label || n.id}</div>
            <div class="output-body" id="body-${n.id}"></div>
          </div>
        `;
      }).join('')
    ).join('');
  }

  _updateOutput(data) {
    const card = document.getElementById(`out-${data.nodeId}`);
    if (!card) return;
    const statusEl = card.querySelector('.output-status');
    if (statusEl) {
      const icons = { running: '🔄', completed: '✅', failed: '❌' };
      statusEl.textContent = icons[data.status] || '⏳';
    }
    card.className = `output-card status-${data.status}`;

    // Show prompt content when completed
    const body = document.getElementById(`body-${data.nodeId}`);
    if (body && data.status === 'completed' && data.result) {
      if (data.result.prompt) {
        body.innerHTML = `
          <pre class="prompt-text">${this._escapeHtml(data.result.prompt.slice(0, 600))}${data.result.prompt.length > 600 ? '...' : ''}</pre>
          <button class="btn btn-sm" onclick="navigator.clipboard.writeText(\`${this._escapeJs(data.result.prompt)}\`);this.textContent='✅ 已复制'">📋 复制 Prompt</button>
        `;
      } else if (data.result.label) {
        body.innerHTML = `<span class="output-item">${data.result.label} · ${data.result.aspectRatio || ''} · ${data.result.shots || ''}镜</span>`;
      }
    }
    if (body && data.status === 'failed') {
      body.innerHTML = `<span class="output-error">${data.error || '失败'}</span>`;
    }
  }

  _escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  _escapeJs(s) {
    return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\n/g,'\\n');
  }

  _showOutputError(msg) {
    const grid = document.getElementById('outputGrid');
    if (grid) grid.innerHTML += `<div class="workflow-error">❌ ${msg}</div>`;
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
