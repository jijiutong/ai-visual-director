// pro-view.js — professional node canvas view
class ProView {
  constructor() {
    this.canvas = null;
    this.flowName = null;
    this.chatMessages = [];
  }

  render() {
    const svg = document.getElementById('canvasSvg');
    const library = document.getElementById('nodeLibrary');
    if (!svg || !library) return;

    if (!this.canvas) {
      this.canvas = new FlowCanvas(svg);
      this._setupDrop(svg);
    }
    // Show guide if canvas is empty
    if (this.canvas.nodes.length === 0) {
      if (typeof this.canvas._showGuide === 'function') this.canvas._showGuide();
    }
    renderNodeLibrary(library);

    if (window.setChatVisible) window.setChatVisible(true);

    // Ensure chat message area exists
    this._ensureChatDisplay();

    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatInput');
    if (sendBtn && input) {
      sendBtn.onclick = () => this._sendMessage();
      input.onkeydown = (e) => { if (e.key === 'Enter') this._sendMessage(); };
    }
  }

  _ensureChatDisplay() {
    if (document.getElementById('chatMessages')) return;
    const chatBar = document.getElementById('chatBarContainer');
    if (!chatBar) return;
    const display = document.createElement('div');
    display.id = 'chatMessages';
    display.className = 'chat-messages';
    display.innerHTML = '<div class="chat-hint">💡 输入 <code>/help</code> 查看可用命令，或直接打字发到 Claude Code</div>';
    // Insert above chatBar in body
    document.body.insertBefore(display, chatBar);
  }

  async _sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    const message = input.value.trim();
    input.value = '';

    this._addChatBubble(message, 'user');

    try {
      const resp = await fetch(`${api.base}/api/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await resp.json();

      if (data.reply) {
        this._addChatBubble(data.reply.text, data.reply.from);

        // Execute action if any
        if (data.reply.action) {
          this._executeAction(data.reply.action);
        }
      }
    } catch (e) {
      this._addChatBubble('❌ 发送失败: ' + e.message, 'system');
    }
  }

  _addChatBubble(text, role) {
    const display = document.getElementById('chatMessages');
    if (!display) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble chat-${role}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    display.appendChild(bubble);
    display.scrollTop = display.scrollHeight;
  }

  _executeAction(action) {
    if (!action) return;
    switch (action.type) {
      case 'switchTab':
        if (typeof switchTool === 'function') switchTool(action.tab === 'simple' ? 'storyboard' : action.tab);
        break;
      case 'startFlow':
        if (confirm(`启动流程「${action.flowName}」？`)) {
          if (window.marketView) {
            window.marketView.selectedStyle = null;
            window.marketView.render();
          }
          if (typeof switchTool === 'function') switchTool('storyboard');
        }
        break;
      case 'clearChat':
        const display = document.getElementById('chatMessages');
        if (display) display.innerHTML = '';
        break;
    }
  }

  _setupDrop(svg) {
    svg.addEventListener('dragover', e => e.preventDefault());
    svg.addEventListener('drop', (e) => {
      e.preventDefault();
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        const rect = svg.getBoundingClientRect();
        this.canvas.addNode(data, e.clientX - rect.left, e.clientY - rect.top);
      } catch (err) {}
    });
  }

  loadFromStory() {
    const storyInput = document.getElementById('storyInput');
    const story = storyInput?.value?.trim() || '';
    if (!story) { alert('请先在故事板页面输入故事'); return; }

    // Build a simple flow from story
    const flowDef = {
      name: '从故事生成',
      nodes: [
        { id: 'story', type: 'paste_story', label: '📋 故事', params: { content: story } },
        { id: 'extract', type: 'extract_all', label: '🧬 提取信息', params: {} },
        { id: 'character', type: 'generate_character', label: '👤 角色卡', params: {} },
        { id: 'scene', type: 'generate_scene', label: '🏞 场景图', params: {} },
        { id: 'storyboard', type: 'generate_storyboard', label: '🎬 分镜', params: {} },
        { id: 'export', type: 'export', label: '📦 导出', params: {} }
      ],
      edges: [
        { from: 'story', to: 'extract' },
        { from: 'extract', to: 'character' },
        { from: 'extract', to: 'scene' },
        { from: 'extract', to: 'storyboard' },
        { from: 'character', to: 'export' },
        { from: 'scene', to: 'export' },
        { from: 'storyboard', to: 'export' }
      ]
    };
    this.canvas.loadFlow(flowDef);
    this.flowName = flowDef.name;
  }

  async loadPresetFlow() {
    try {
      const data = await api.listFlows();
      const flows = data.flows || [];
      if (flows.length === 0) { alert('没有可用的预设流程'); return; }

      // Create a quick dropdown rather than prompt()
      const existing = document.getElementById('presetFlowSelect');
      if (existing) existing.remove();

      const select = document.createElement('select');
      select.id = 'presetFlowSelect';
      select.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;padding:12px 20px;font-size:15px;background:var(--bg-card);color:var(--text);border:2px solid var(--accent);border-radius:8px;cursor:pointer;min-width:280px;';
      select.innerHTML = `<option value="">— 选择预设流程 —</option>` +
        flows.map((f, i) => `<option value="${i}">${f.icon || ''} ${f.name}</option>`).join('');

      select.addEventListener('change', async () => {
        const idx = parseInt(select.value);
        if (isNaN(idx)) return;
        const flow = flows[idx];
        const resp = await fetch(`/workflows/${flow.flowFile}.json`);
        if (resp.ok) {
          const flowDef = await resp.json();
          this.canvas.loadFlow(flowDef);
          this.flowName = flowDef.name;
        }
        select.remove();
      });

      select.addEventListener('blur', () => setTimeout(() => select.remove(), 200));
      document.body.appendChild(select);
      select.focus();
    } catch (e) {
      alert('加载失败：' + e.message);
    }
  }

  async runWorkflow() {
    try {
      const flowDef = this.canvas.exportFlow();
      if (flowDef.nodes.length === 0) { alert('画布为空，请先拖节点或加载预设流程'); return; }

      const resp = await fetch(`${api.base}/api/workflow/start-custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flowDef, platform: 'seedance', pastedStory: '自定义画布流程' })
      });
      if (!resp.ok) throw new Error(await resp.text());
      const result = await resp.json();

      console.log('Workflow started:', result);
      alert(`流程已启动: ${result.workflowId}`);
    } catch (e) {
      alert('运行失败：' + e.message);
    }
  }

  clearCanvas() {
    if (confirm('清空画布？所有节点和连线都会丢失。')) {
      this.canvas.clear();
    }
  }

  async saveAsCustom() {
    const name = prompt('给这个流程起个名字：');
    if (!name) return;
    try {
      const flowDef = this.canvas.exportFlow();
      const config = await api.getConfig();
      config.custom_workflows = config.custom_workflows || [];
      config.custom_workflows.push({
        name,
        icon: '🔧',
        flowDef,
        flowFile: `custom_${Date.now()}`
      });
      await api.updateConfig({ custom_workflows: config.custom_workflows });
      alert('流程已保存 ✅');
    } catch (e) {
      alert('保存失败：' + e.message);
    }
  }
}

window.proView = new ProView();
