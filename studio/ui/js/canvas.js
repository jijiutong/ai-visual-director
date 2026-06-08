// canvas.js — SVG-based flow canvas (drag, drop, connect)
class FlowCanvas {
  constructor(svgElement) {
    this.svg = svgElement;
    this.nodes = [];
    this.edges = [];
    this.dragging = null;
    this.connecting = null;
    this._setupEvents();
  }

  addNode(nodeDef, x, y) {
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(${x},${y})`);
    g.setAttribute('data-node-id', nodeDef.id);
    g.classList.add('canvas-node');

    const rect = document.createElementNS(ns, 'rect');
    rect.setAttribute('width', '140'); rect.setAttribute('height', '52');
    rect.setAttribute('rx', '8'); rect.classList.add('node-body');
    g.appendChild(rect);

    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', '70'); text.setAttribute('y', '30');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = nodeDef.label || nodeDef.id;
    text.classList.add('node-label');
    g.appendChild(text);

    const outPort = document.createElementNS(ns, 'circle');
    outPort.setAttribute('cx', '140'); outPort.setAttribute('cy', '26'); outPort.setAttribute('r', '6');
    outPort.classList.add('port', 'port-out');
    outPort.dataset.port = 'out'; outPort.dataset.nodeId = nodeDef.id;
    g.appendChild(outPort);

    const inPort = document.createElementNS(ns, 'circle');
    inPort.setAttribute('cx', '0'); inPort.setAttribute('cy', '26'); inPort.setAttribute('r', '6');
    inPort.classList.add('port', 'port-in');
    inPort.dataset.port = 'in'; inPort.dataset.nodeId = nodeDef.id;
    g.appendChild(inPort);

    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', '130'); dot.setAttribute('cy', '10'); dot.setAttribute('r', '4');
    dot.classList.add('status-dot', 'status-pending');
    g.appendChild(dot);

    this.svg.appendChild(g);
    this.nodes.push({ id: nodeDef.id, def: nodeDef, g, x, y });
    return g;
  }

  addEdge(fromId, toId) {
    if (this.edges.find(e => e.from === fromId && e.to === toId)) return;
    const ns = 'http://www.w3.org/2000/svg';
    const line = document.createElementNS(ns, 'line');
    line.classList.add('edge-line');
    line.dataset.from = fromId; line.dataset.to = toId;
    this.svg.insertBefore(line, this.svg.firstChild);
    this.edges.push({ from: fromId, to: toId, line });
    this._updateEdge(line, fromId, toId);
  }

  _updateEdge(line, fromId, toId) {
    const fn = this.nodes.find(n => n.id === fromId);
    const tn = this.nodes.find(n => n.id === toId);
    if (!fn || !tn) return;
    line.setAttribute('x1', fn.x + 140); line.setAttribute('y1', fn.y + 26);
    line.setAttribute('x2', tn.x); line.setAttribute('y2', tn.y + 26);
  }

  _updateAllEdges() {
    this.edges.forEach(e => this._updateEdge(e.line, e.from, e.to));
  }

  _setupEvents() {
    this.svg.addEventListener('mousedown', (e) => {
      const port = e.target.closest('.port');
      if (port && port.classList.contains('port-out')) {
        this.connecting = { fromNodeId: port.dataset.nodeId };
        e.stopPropagation(); return;
      }
      const node = e.target.closest('.canvas-node');
      if (node) {
        const match = node.getAttribute('transform').match(/translate\(([^,]+),([^)]+)\)/);
        this.dragging = {
          nodeId: node.dataset.nodeId,
          ox: e.clientX - parseFloat(match[1]),
          oy: e.clientY - parseFloat(match[2])
        };
      }
    });

    this.svg.addEventListener('mousemove', (e) => {
      if (!this.dragging) return;
      const node = this.svg.querySelector(`[data-node-id="${this.dragging.nodeId}"]`);
      if (!node) return;
      const x = e.clientX - this.dragging.ox, y = e.clientY - this.dragging.oy;
      node.setAttribute('transform', `translate(${x},${y})`);
      const n = this.nodes.find(n => n.id === this.dragging.nodeId);
      if (n) { n.x = x; n.y = y; }
      this._updateAllEdges();
    });

    this.svg.addEventListener('mouseup', (e) => {
      if (this.connecting) {
        const port = e.target.closest('.port-in');
        if (port && port.dataset.nodeId !== this.connecting.fromNodeId) {
          this.addEdge(this.connecting.fromNodeId, port.dataset.nodeId);
        }
        this.connecting = null;
      }
      this.dragging = null;
    });
  }

  loadFlow(flowDef) {
    this.clear();
    flowDef.nodes.forEach((node, idx) => {
      const col = idx % 3, row = Math.floor(idx / 3);
      this.addNode(node, col * 200 + 40, row * 100 + 40);
    });
    flowDef.edges.forEach(e => this.addEdge(e.from, e.to));
    this._hideGuide();
  }

  _showGuide() {
    this._hideGuide();
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.id = 'canvasGuide';
    g.classList.add('canvas-guide');

    const texts = [
      { y: 100, t: '📋 加载预设流程 — 从 5 个内置流程开始' },
      { y: 160, t: '📝 从当前故事生成流程' },
      { y: 220, t: '🧩 从右侧拖入节点，自由编排' },
    ];

    texts.forEach(item => {
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', '50%'); text.setAttribute('y', item.y);
      text.setAttribute('text-anchor', 'middle');
      text.textContent = item.t;
      text.classList.add('canvas-guide-text');
      g.appendChild(text);
    });

    this.svg.appendChild(g);
  }

  _hideGuide() {
    const g = this.svg.querySelector('#canvasGuide');
    if (g) g.remove();
  }

  clear() {
    this.nodes = [];
    this.edges = [];
    this.svg.innerHTML = '';
    this._showGuide();
  }

  exportFlow() {
    return {
      nodes: this.nodes.map(n => ({ id: n.id, type: n.def.type, label: n.def.label, params: n.def.params || {} })),
      edges: this.edges.map(e => ({ from: e.from, to: e.to }))
    };
  }

  clear() {
    this.nodes = [];
    this.edges = [];
    this.svg.innerHTML = '';
  }
}
