const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST /api/workflow/start
router.post('/start', async (req, res) => {
  try {
    const { flowFile, chapterPath, duration, shotCount, aspectRatio, style, platform, pastedStory } = req.body;
    const { flowsDir, vaultPath, workflowEngine, agentPool } = req.app.locals;

    // Load flow definition
    const flowPath = path.join(flowsDir, `${flowFile}.json`);
    if (!fs.existsSync(flowPath)) {
      return res.status(404).json({ error: `Flow not found: ${flowFile}` });
    }
    const flowDef = JSON.parse(fs.readFileSync(flowPath, 'utf-8'));

    // Parse into execution plan
    const plan = workflowEngine.plan(flowDef);

    // Build context
    const context = {
      vaultPath, chapterPath, pastedStory,
      duration: duration || 15, shotCount: shotCount || 7,
      aspectRatio: aspectRatio || '16:9',
      style: style || 'auto', platform: platform || 'seedance'
    };

    // Execute in background
    const workflowId = `wf_${Date.now()}`;
    agentPool.execute(plan, context).then(results => {
      console.log(`Workflow ${workflowId} completed`);
    }).catch(err => {
      console.error(`Workflow ${workflowId} failed:`, err);
    });

    res.json({
      workflowId, flowName: flowDef.name,
      plan: workflowEngine.flattenPlan(plan), status: 'started'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/workflow/:id/status
router.get('/:id/status', (req, res) => {
  const { agentPool } = req.app.locals;
  const statuses = {};
  for (const [nodeId, state] of agentPool.running) {
    statuses[nodeId] = { status: state.status, label: state.result?.format || nodeId, error: state.error };
  }
  res.json({ workflowId: req.params.id, nodes: statuses });
});

// GET /api/workflow/flows/list
router.get('/flows/list', (req, res) => {
  const { configManager } = req.app.locals;
  const config = configManager.get();
  const allFlows = [
    ...(config.preset_workflows || []).map(w => ({ ...w, category: 'preset' })),
    ...(config.custom_workflows || []).map(w => ({ ...w, category: 'custom' }))
  ];
  res.json({ flows: allFlows });
});

// POST /api/workflow/start-custom — run a flow from JSON (not on disk, e.g. canvas flows)
router.post('/start-custom', async (req, res) => {
  try {
    const { flowDef, duration, shotCount, aspectRatio, style, platform, pastedStory, chapterPath } = req.body;
    const { vaultPath, workflowEngine, agentPool } = req.app.locals;

    if (!flowDef || !flowDef.nodes || flowDef.nodes.length === 0) {
      return res.status(400).json({ error: 'flowDef with nodes required' });
    }

    const plan = workflowEngine.plan(flowDef);
    const context = {
      vaultPath, chapterPath, pastedStory,
      duration: duration || 15, shotCount: shotCount || 7,
      aspectRatio: aspectRatio || '16:9',
      style: style || 'auto', platform: platform || 'seedance'
    };

    const workflowId = `wf_${Date.now()}`;
    agentPool.execute(plan, context).then(results => {
      console.log(`Workflow ${workflowId} completed`);
    }).catch(err => {
      console.error(`Workflow ${workflowId} failed:`, err);
    });

    res.json({
      workflowId, flowName: flowDef.name || '自定义流程',
      plan: workflowEngine.flattenPlan(plan), status: 'started'
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
