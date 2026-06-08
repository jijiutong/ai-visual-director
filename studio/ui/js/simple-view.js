// simple-view.js — flow cards + step pipeline
class SimpleView {
  constructor() {
    this.state = 'cards';
    this.currentFlow = null;
    this.workflowId = null;
    this.nodeStatus = {};
    this.unsubscribe = null;
  }

  async render() {
    const container = document.getElementById('simpleViewContainer');
    if (!container) return;
    container.innerHTML = '';
    if (this.state === 'cards') await this.renderCards(container);
    else this.renderPipeline(container);
  }

  async renderCards(container) {
    let flows = [];
    try {
      const data = await api.listFlows();
      flows = data.flows || [];
    } catch (e) {
      flows = [
        { name: '小说转短剧', icon: '📖→🎬', flowFile: 'novel-to-video', category: 'preset', default: true, description: 'Obsidian → 分镜 → 视频' },
        { name: '仅出分镜', icon: '🎬', flowFile: 'storyboard-only', category: 'preset', description: '贴故事 → 全案板+角色卡' },
        { name: '角色设计', icon: '👤', flowFile: 'character-design', category: 'preset', description: 'DNA → 角色卡 → 三视图' },
        { name: '分镜转视频', icon: '🎥', flowFile: 'board-to-video', category: 'preset', description: '分镜图 → Prompt → 出片' },
        { name: '一键全来', icon: '⚡', flowFile: 'one-click-all', category: 'preset', description: '全案板+角色卡+海报+情绪板' }
      ];
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'flow-cards';

    flows.forEach(flow => {
      const card = document.createElement('div');
      card.className = `flow-card ${flow.default ? 'default' : ''}`;
      card.innerHTML = `
        <div class="flow-card-icon">${flow.icon || '📋'}</div>
        <div class="flow-card-name">${flow.name || flow.flowFile}</div>
        ${flow.description ? `<div class="flow-card-desc">${flow.description}</div>` : ''}
      `;
      card.addEventListener('click', () => this.startFlow(flow));
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  async startFlow(flow) {
    this.currentFlow = flow;
    this.state = 'pipeline';
    this.render();

    this.unsubscribe = onProgress((data) => {
      if (data.nodeId) {
        this.nodeStatus[data.nodeId] = data;
        this.updateStepUI(data);
      }
    });

    try {
      const result = await api.startWorkflow({
        flowFile: flow.flowFile,
        chapterPath: flow.chapterPath || '',
        duration: flow.duration || 15,
        shotCount: flow.shotCount || 7
      });
      this.workflowId = result.workflowId;
      if (result.plan) this.renderSteps(result.plan);
    } catch (e) {
      const steps = document.getElementById('pipelineSteps');
      if (steps) steps.innerHTML += `<div class="workflow-error">❌ ${e.message}</div>`;
    }
  }

  renderPipeline(container) {
    container.innerHTML = `
      <div class="pipeline-header">
        <button class="btn-back" onclick="simpleView.backToCards()">← 返回</button>
        <h2>${this.currentFlow?.name || '流程'}</h2>
      </div>
      <div class="pipeline-steps" id="pipelineSteps"></div>
    `;
  }

  renderSteps(plan) {
    const container = document.getElementById('pipelineSteps');
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'steps-flow';

    plan.forEach((phase, idx) => {
      if (idx > 0) {
        const arrow = document.createElement('div');
        arrow.className = 'step-arrow';
        arrow.textContent = '▶';
        wrapper.appendChild(arrow);
      }

      const phaseGroup = document.createElement('div');
      phaseGroup.className = `phase-group ${phase.parallel ? 'parallel' : ''}`;

      (phase.nodes || []).forEach(node => {
        const card = document.createElement('div');
        card.className = 'step-card';
        card.id = `step-${node.id}`;
        card.innerHTML = `
          <div class="step-status-indicator" id="status-${node.id}">⏳</div>
          <div class="step-label">${node.label || node.id}</div>
          <div class="step-preview" id="preview-${node.id}"></div>
        `;
        phaseGroup.appendChild(card);
      });

      wrapper.appendChild(phaseGroup);
    });

    container.innerHTML = '';
    container.appendChild(wrapper);
  }

  updateStepUI(data) {
    const indicator = document.getElementById(`status-${data.nodeId}`);
    if (indicator) {
      const icons = { pending: '⏳', running: '🔄', completed: '✅', failed: '❌' };
      indicator.textContent = icons[data.status] || '⏳';
      const card = document.getElementById(`step-${data.nodeId}`);
      if (card) {
        card.classList.remove('status-running', 'status-completed', 'status-failed');
        card.classList.add(`status-${data.status}`);
      }
    }

    const preview = document.getElementById(`preview-${data.nodeId}`);
    if (preview && data.result) {
      if (data.result.url) {
        preview.innerHTML = `<img src="${data.result.url}" class="step-thumb" alt="" />`;
      } else if (data.result.videoUrl) {
        preview.innerHTML = `<video src="${data.result.videoUrl}" class="step-thumb" controls></video>`;
      } else if (data.result.format) {
        preview.innerHTML = `<span class="run-status running">${data.result.format}</span>`;
      }
    }
  }

  backToCards() {
    this.state = 'cards';
    this.currentFlow = null;
    this.workflowId = null;
    this.nodeStatus = {};
    if (this.unsubscribe) { this.unsubscribe(); this.unsubscribe = null; }
    this.render();
  }
}

window.simpleView = new SimpleView();
