const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const VaultReader = require('./vault-reader');
const ConfigManager = require('./config-manager');
const APIProxy = require('./api-proxy');
const WorkflowEngine = require('./workflow-engine');
const AgentPool = require('./agent-pool');
const SkillBridge = require('./skill-bridge');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Determine vault path: config.yml > env var > cwd
const configManager = new ConfigManager(process.cwd());
configManager.load();
const configVaultPath = configManager.get('vault_path');
const vaultPath = configVaultPath || process.env.OBSIDIAN_VAULT || process.cwd();
console.log(`Vault path: ${vaultPath}`);

// Re-init configManager with correct vault path if it differs
if (configVaultPath && configVaultPath !== process.cwd()) {
  configManager.vaultPath = configVaultPath;
  configManager.configPath = require('path').join(configVaultPath, 'config.yml');
  configManager.load();
}

// Initialize services
const vaultReader = new VaultReader(vaultPath);
const apiProxy = new APIProxy(configManager);
const workflowEngine = new WorkflowEngine();
const skillBridge = new SkillBridge({
  onRequest: (req) => console.log(`SkillBridge: ${req.requestId} — ${req.skill}/${req.action}`)
});

const agentPool = new AgentPool({
  vaultReader, configManager, apiProxy, skillBridge,
  onProgress: (data) => broadcastProgress(data)
});

// Share services with routes
Object.assign(app.locals, {
  vaultReader, configManager, apiProxy, workflowEngine, agentPool, skillBridge,
  vaultPath, flowsDir: path.join(__dirname, '..', 'workflows'), wss
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/workflow', require('./routes/workflow'));
app.use('/api/config', require('./routes/config'));
app.use('/api/vault', require('./routes/vault'));
app.use('/api/preview', require('./routes/preview'));
app.use('/api/chat', require('./routes/chat'));

// Serve UI static files
const uiDir = path.join(__dirname, '..', 'ui');
app.use(express.static(uiDir));

// Serve workflow definitions as static
app.use('/workflows', express.static(path.join(__dirname, '..', 'workflows')));

// WebSocket
wss.on('connection', (ws) => {
  console.log('UI client connected');
  ws.on('close', () => console.log('UI client disconnected'));
});

function broadcastProgress(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(msg);
  });
}

// Start
const PORT = process.env.PORT || 9999;
server.listen(PORT, () => {
  console.log(`\n🎬 AI Story Studio running at http://localhost:${PORT}\n`);
  const { exec } = require('child_process');
  const platform = process.platform;
  const openCmd = platform === 'darwin' ? 'open' : platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${openCmd} http://localhost:${PORT}`);
});

module.exports = { app, server, wss, broadcastProgress, agentPool };
