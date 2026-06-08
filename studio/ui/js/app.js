// app.js — tool switching (IDE-style sidebar)
let currentTool = 'storyboard';

function setChatVisible(visible) {
  const chatBar = document.getElementById('chatBarContainer');
  const chatMessages = document.getElementById('chatMessages');
  if (chatBar) chatBar.style.display = visible ? 'flex' : 'none';
  if (chatMessages) chatMessages.style.display = visible ? 'flex' : 'none';
}

function switchTool(tool) {
  currentTool = tool;

  // Update toolbar active state
  document.querySelectorAll('.toolbar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tool === tool);
  });

  const workspace = document.getElementById('workspace');
  if (!workspace) return;

  workspace.className = 'workspace';
  workspace.innerHTML = '';

  switch (tool) {
    case 'storyboard':
      workspace.innerHTML = `
        <div class="storyboard-workspace">
          <header class="studio-header">
            <div>
              <h1>AI Story Studio</h1>
              <p>把故事快速推进到分镜、角色、海报和视频 Prompt</p>
            </div>
            <div class="studio-header-actions">
              <span class="studio-status-pill">本地工作台</span>
              <span class="studio-status-pill studio-status-live">WebSocket</span>
            </div>
          </header>
          <div class="market-main">
            <div class="story-input-area">
              <textarea id="storyInput" class="story-textarea" placeholder="📝 粘贴你的故事、小说段落、剧本片段..." rows="4"></textarea>
              <span class="story-hint">AI 会在你输入后自动推荐风格</span>
            </div>
            <div class="recommendations" id="aiRecommendations" style="display:none"></div>
            <div class="style-section">
              <div class="section-header collapsible" onclick="window.marketView.toggleGallery()">
                <h2>🎨 风格画廊</h2>
                <span class="section-hint">7大分类 · 53种风格</span>
                <span class="collapse-arrow" id="galleryArrow">▶</span>
              </div>
              <div class="style-gallery" id="styleGallery" style="display:none"></div>
            </div>
            <div class="market-actions">
              <button class="btn btn-primary btn-lg" id="btnGenerate" disabled onclick="window.marketView.generateStoryboard()">🎬 生成分镜</button>
              <button class="btn btn-lg" id="btnAllInOne" disabled onclick="window.marketView.generateAll()">⚡ 一键全来</button>
              <button class="btn btn-lg" id="btnSave" onclick="window.marketView.saveWork()">💾 保存</button>
              <span class="selection-status" id="selectionStatus">👆 先选一个风格</span>
            </div>
            <div class="output-area" id="outputArea" style="display:none">
              <div class="section-header"><h2>📋 产出</h2></div>
              <div class="output-grid" id="outputGrid"></div>
            </div>
          </div>
        </div>`;
      if (window.marketView) window.marketView.render();
      setChatVisible(false);
      break;

    case 'character':
      workspace.innerHTML = `
        <div class="tool-workspace">
          <div class="tool-hero"><h2>👤 角色设计</h2><p>角色DNA → 角色卡 → 三视图 → 12表情</p></div>
          <textarea id="toolInput" class="story-textarea" placeholder="描述你的角色：姓名、外貌、性格、身份..." rows="4"></textarea>
          <br/>
          <button class="btn btn-primary btn-lg" onclick="window.sidebarTools.runStandaloneTool('character-design')">▶ 生成角色</button>
          <div class="tool-output" id="toolOutput" style="display:none"><div class="output-grid" id="outputGrid"></div></div>
        </div>`;
      setChatVisible(false);
      break;

    case 'scene':
      workspace.innerHTML = `
        <div class="tool-workspace">
          <div class="tool-hero"><h2>🏞️ 场景概念</h2><p>场景概念图 + 氛围参考</p></div>
          <textarea id="toolInput" class="story-textarea" placeholder="描述你的场景：地点、时代、天气、氛围..." rows="4"></textarea>
          <br/>
          <button class="btn btn-primary btn-lg" onclick="window.sidebarTools.runStandaloneTool('scene-card')">▶ 生成场景</button>
          <div class="tool-output" id="toolOutput" style="display:none"><div class="output-grid" id="outputGrid"></div></div>
        </div>`;
      setChatVisible(false);
      break;

    case 'video':
      workspace.innerHTML = `
        <div class="tool-workspace">
          <div class="tool-hero"><h2>🎥 分镜转视频</h2><p>分镜图 → 合并帧 → Prompt → 出片</p></div>
          <textarea id="toolInput" class="story-textarea" placeholder="描述分镜内容、运镜方式..." rows="4"></textarea>
          <br/>
          <button class="btn btn-primary btn-lg" onclick="window.sidebarTools.runStandaloneTool('board-to-video')">▶ 生成视频Prompt</button>
          <div class="tool-output" id="toolOutput" style="display:none"><div class="output-grid" id="outputGrid"></div></div>
        </div>`;
      setChatVisible(false);
      break;

    case 'poster':
      workspace.innerHTML = `
        <div class="tool-workspace">
          <div class="tool-hero"><h2>🎨 海报</h2><p>生成电影海报 / 宣传海报</p></div>
          <textarea id="toolInput" class="story-textarea" placeholder="片名、标语、关键场景描述..." rows="4"></textarea>
          <br/>
          <button class="btn btn-primary btn-lg" onclick="window.sidebarTools.runStandaloneTool('poster')">▶ 生成海报</button>
          <div class="tool-output" id="toolOutput" style="display:none"><div class="output-grid" id="outputGrid"></div></div>
        </div>`;
      setChatVisible(false);
      break;

    case 'allinone':
      workspace.innerHTML = `
        <div class="tool-workspace">
          <div class="tool-hero"><h2>⚡ 一键全来</h2><p>全案板+角色卡+海报+情绪板 一次出</p></div>
          <textarea id="toolInput" class="story-textarea" placeholder="粘贴你的故事..." rows="4"></textarea>
          <br/>
          <button class="btn btn-primary btn-lg" onclick="window.sidebarTools.runStandaloneTool('one-click-all')">▶ 一键生成</button>
          <div class="tool-output" id="toolOutput" style="display:none"><div class="output-grid" id="outputGrid"></div></div>
        </div>`;
      setChatVisible(false);
      break;

    case 'pro':
      workspace.innerHTML = `
        <header class="studio-header pro-header">
          <div>
            <h1>专业流程画布</h1>
            <p>拖拽节点、编排故事生产链路，并直接运行本地工作流</p>
          </div>
          <div class="studio-header-actions">
            <span class="studio-status-pill">Flow Canvas</span>
          </div>
        </header>
        <div class="pro-layout">
          <div class="canvas-area"><svg id="canvasSvg" class="flow-canvas"></svg></div>
          <aside class="node-library" id="nodeLibrary"></aside>
        </div>
        <div class="pro-toolbar">
          <button class="btn" onclick="window.proView.loadPresetFlow()">📋 加载预设流程</button>
          <button class="btn btn-primary" onclick="window.proView.runWorkflow()">▶ 运行</button>
          <button class="btn" onclick="window.proView.clearCanvas()">🗑 清空</button>
          <button class="btn" onclick="window.proView.saveAsCustom()">💾 保存流程</button>
        </div>`;
      workspace.classList.add('workspace-pro');
      if (window.proView) window.proView.render();
      setChatVisible(true);
      break;

    case 'config':
      workspace.innerHTML = '<div id="configPanelContainer"></div>';
      if (window.configPanel) window.configPanel.render();
      setChatVisible(false);
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  switchTool('storyboard');
});
