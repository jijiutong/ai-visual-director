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
    renderNodeLibrary(library);

    const chatBar = document.getElementById('chatBarContainer');
    if (chatBar) chatBar.style.display = 'flex';

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
        switchTab(action.tab);
        break;
      case 'startFlow':
        if (confirm(`启动流程「${action.flowName}」？`)) {
          const simpleView = window.simpleView || new SimpleView();
          simpleView.startFlow({ name: action.flowName, flowFile: action.flowFile, icon: '🎬' });
          switchTab('simple');
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

  async loadPresetFlow() {
    try {
      const data = await api.listFlows();
      const flows = data.flows || [];
      const names = flows.map((f, i) => `${i + 1}. ${f.name}`).join('\n');
      const choice = prompt(`选一个预设流程加载到画布：\n\n${names}\n\n输入编号：`);
      if (choice) {
        const idx = parseInt(choice) - 1;
        if (flows[idx]) {
          const flowFile = flows[idx].flowFile;
          const resp = await fetch(`./workflows/${flowFile}.json`);
          if (resp.ok) {
            const flowDef = await resp.json();
            this.canvas.loadFlow(flowDef);
            this.flowName = flowDef.name;
          } else {
            // Use fallback: load locally from api
            this.canvas.loadFlow({ nodes: [], edges: [] });
          }
        }
      }
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
