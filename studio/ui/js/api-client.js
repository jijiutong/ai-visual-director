// api-client.js — API + WebSocket client
const API_BASE_URL = 'http://localhost:9999';
const API_BASE = API_BASE_URL + '/api';

const api = {
  base: API_BASE_URL,
  async startWorkflow(options) {
    const resp = await fetch(`${API_BASE}/workflow/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    if (!resp.ok) throw new Error(await resp.text());
    return resp.json();
  },

  async getWorkflowStatus(id) {
    const resp = await fetch(`${API_BASE}/workflow/${id}/status`);
    return resp.json();
  },

  async listFlows() {
    const resp = await fetch(`${API_BASE}/workflow/flows/list`);
    return resp.json();
  },

  async getConfig() {
    const resp = await fetch(`${API_BASE}/config`);
    return resp.json();
  },

  async updateConfig(config) {
    const resp = await fetch(`${API_BASE}/config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return resp.json();
  },

  async getVaultTree(subPath = '') {
    const resp = await fetch(`${API_BASE}/vault/tree?path=${encodeURIComponent(subPath)}`);
    return resp.json();
  },

  async getVaultFile(filePath) {
    const resp = await fetch(`${API_BASE}/vault/file?path=${encodeURIComponent(filePath)}`);
    return resp.json();
  },

  async getVaultProject(projectPath) {
    const resp = await fetch(`${API_BASE}/vault/project?path=${encodeURIComponent(projectPath)}`);
    return resp.json();
  },

  previewUrl(filePath) {
    return `${API_BASE}/preview/${encodeURIComponent(filePath)}`;
  }
};

// WebSocket
let ws = null;
const wsCallbacks = [];

function connectWebSocket() {
  try {
    const wsUrl = API_BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://');
    ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      console.log('WS connected');
      document.body.classList.add('ws-connected');
      document.body.classList.remove('ws-disconnected');
      const indicator = document.getElementById('wsIndicator');
      if (indicator) indicator.textContent = '🟢';
    };
    ws.onclose = () => {
      console.log('WS disconnected');
      document.body.classList.add('ws-disconnected');
      document.body.classList.remove('ws-connected');
      const indicator = document.getElementById('wsIndicator');
      if (indicator) indicator.textContent = '⚫';
      setTimeout(connectWebSocket, 3000);
    };
    ws.onerror = () => {};
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        wsCallbacks.forEach(cb => cb(data));
      } catch (e) {}
    };
  } catch (e) {
    setTimeout(connectWebSocket, 3000);
  }
}

function onProgress(callback) {
  wsCallbacks.push(callback);
  return () => { const i = wsCallbacks.indexOf(callback); if (i >= 0) wsCallbacks.splice(i, 1); };
}

connectWebSocket();
