const express = require('express');
const router = express.Router();

const chatHistory = [];
const MAX_HISTORY = 200;
const taskQueue = []; // { id, type, payload, status:'pending|processing|done', result:null, createdAt }

// POST /api/chat/send — web UI sends a /skill command or chat message
router.post('/send', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  const msg = {
    id: `msg_${Date.now()}`,
    text: message,
    from: 'web-ui',
    timestamp: new Date().toISOString()
  };

  chatHistory.push(msg);
  if (chatHistory.length > MAX_HISTORY) chatHistory.shift();

  // Parse /skill commands
  let response = null;
  if (message.startsWith('/')) {
    response = parseSkillCommand(message);
  }

  if (response) {
    const reply = {
      id: `msg_${Date.now() + 1}`,
      text: response.text,
      from: 'system',
      action: response.action,
      timestamp: new Date().toISOString()
    };
    chatHistory.push(reply);
    res.json({ received: msg, reply });
  } else {
    res.json({
      received: msg,
      reply: {
        id: `msg_${Date.now() + 1}`,
        text: `📨 消息已记录。在 Claude Code 对话中说"处理画布消息"来执行。`,
        from: 'system',
        timestamp: new Date().toISOString()
      }
    });
  }
});

// GET /api/chat/history — Claude Code context reads pending messages
router.get('/history', (req, res) => {
  const since = req.query.since;
  let messages = chatHistory;
  if (since) {
    const sinceIdx = chatHistory.findIndex(m => m.id === since);
    if (sinceIdx >= 0) messages = chatHistory.slice(sinceIdx + 1);
  }

  // Return unprocessed messages (from web-ui, no reply yet)
  const pending = messages.filter(m => m.from === 'web-ui');
  res.json({ messages, pending: pending.length, total: chatHistory.length });
});

// POST /api/chat/respond — Claude Code context sends response
router.post('/respond', (req, res) => {
  const { inReplyTo, text } = req.body;
  const reply = {
    id: `msg_${Date.now()}`,
    text,
    from: 'claude',
    inReplyTo,
    timestamp: new Date().toISOString()
  };
  chatHistory.push(reply);
  res.json({ reply });
});

// DELETE /api/chat/clear
router.delete('/clear', (req, res) => {
  chatHistory.length = 0;
  res.json({ cleared: true });
});

// ---- Skill command parser ----
function parseSkillCommand(message) {
  const cmd = message.trim();

  // /help
  if (cmd === '/' || cmd === '/help' || cmd === '/?') {
    return {
      text: `可用命令：
/skill 小说转短剧  — 启动完整视频管线
/skill 仅出分镜    — 只出分镜+角色卡
/skill 角色设计    — 角色DNA→角色卡→三视图
/skill 分镜转视频  — 分镜图→Prompt→出片
/skill 一键全来    — 3风格×4格式一次出
/skill config     — 打开配置面板
/skill simple     — 切换到简单版
/skill pro        — 切换到专业版
/skill clear      — 清空聊天记录
直接打字          — 消息发到 Claude Code 对话`,
      action: null
    };
  }

  // /skill <flow>
  const skillMatch = cmd.match(/^\/skill\s+(.+)/i);
  if (skillMatch) {
    const flowName = skillMatch[1].trim();
    const flowMap = {
      '小说转短剧': 'novel-to-video',
      '仅出分镜': 'storyboard-only',
      '角色设计': 'character-design',
      '分镜转视频': 'board-to-video',
      '一键全来': 'one-click-all',
      'config': null,
      'simple': null,
      'pro': null,
      'clear': null
    };

    if (flowName === 'config') {
      return { text: '⚙️ 切换到配置面板——在浏览器中操作', action: { type: 'switchTab', tab: 'config' } };
    }
    if (flowName === 'simple') {
      return { text: '🟢 切换到简单版', action: { type: 'switchTab', tab: 'simple' } };
    }
    if (flowName === 'pro') {
      return { text: '🟣 切换到专业版', action: { type: 'switchTab', tab: 'pro' } };
    }
    if (flowName === 'clear') {
      chatHistory.length = 0;
      return { text: '🗑 聊天记录已清空', action: { type: 'clearChat' } };
    }

    const flowFile = flowMap[flowName];
    if (flowFile) {
      return {
        text: `▶ 启动流程「${flowName}」——请在浏览器中点击确认`,
        action: { type: 'startFlow', flowFile, flowName }
      };
    }
    return { text: `❓ 未知流程: ${flowName}。输入 /help 查看可用命令。`, action: null };
  }

  // Plain message — store for Claude Code to pick up
  return {
    text: `📨 消息已记录："${cmd.slice(0, 50)}${cmd.length > 50 ? '...' : ''}"`,
    action: { type: 'pendingForClaude' }
  };
}

// POST /api/chat/task — web UI sends a task for CC to process
router.post('/task', (req, res) => {
  const { type, payload } = req.body;
  if (!type) return res.status(400).json({ error: 'type required (recommend|generate)' });

  const task = {
    id: `task_${Date.now()}`,
    type, payload,
    status: 'pending', result: null,
    createdAt: new Date().toISOString()
  };
  taskQueue.push(task);

  console.log(`📨 New task: ${type} — ${task.id}`);
  res.json({ taskId: task.id, status: 'pending' });
});

// GET /api/chat/pending — CC reads pending tasks
router.get('/pending', (req, res) => {
  res.json({ tasks: taskQueue.filter(t => t.status === 'pending') });
});

// POST /api/chat/complete — CC posts result back, broadcasts via WS
router.post('/complete', (req, res) => {
  const { taskId, result } = req.body;
  const task = taskQueue.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'task not found' });
  task.status = 'done';
  task.result = result;
  console.log(`✅ Task completed: ${taskId}`);

  // Broadcast via WebSocket if available
  const wss = req.app.locals.wss;
  if (wss) {
    const msg = JSON.stringify({ type: 'task-done', taskId, result });
    wss.clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
  }

  res.json({ taskId, status: 'done' });
});

// GET /api/chat/task/:id — web UI polls for result
router.get('/task/:id', (req, res) => {
  const task = taskQueue.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'not found' });
  res.json(task);
});

module.exports = router;
module.exports.chatHistory = chatHistory;
module.exports.taskQueue = taskQueue;
