const express = require('express');
const router = express.Router();

// GET /api/vault/tree?path=
router.get('/tree', (req, res) => {
  const { vaultReader } = req.app.locals;
  try {
    const tree = vaultReader.scanDir(req.query.path || '');
    res.json({ vaultPath: vaultReader.vaultPath, tree });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/vault/file?path=
router.get('/file', (req, res) => {
  const { vaultReader } = req.app.locals;
  if (!req.query.path) return res.status(400).json({ error: 'path required' });
  try {
    const data = vaultReader.readFile(req.query.path);
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

// GET /api/vault/project?path=
router.get('/project', (req, res) => {
  const { vaultReader } = req.app.locals;
  try {
    const project = vaultReader.scanProject(req.query.path || '');
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
