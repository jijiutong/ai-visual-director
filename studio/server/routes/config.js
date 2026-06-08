const express = require('express');
const router = express.Router();

// GET /api/config — return config with masked keys
router.get('/', (req, res) => {
  const { configManager } = req.app.locals;
  const config = configManager.get();
  const safe = JSON.parse(JSON.stringify(config));
  const maskKeys = (obj) => {
    if (!obj) return;
    for (const k of Object.keys(obj)) {
      if (obj[k].key) obj[k].key = '••••••••';
    }
  };
  maskKeys(safe.platforms);
  maskKeys(safe.image_platforms);
  res.json(safe);
});

// PUT /api/config — update config
router.put('/', (req, res) => {
  const { configManager } = req.app.locals;
  try {
    const updated = configManager.save(req.body);
    const safe = JSON.parse(JSON.stringify(updated));
    const maskKeys = (obj) => {
      if (!obj) return;
      for (const k of Object.keys(obj)) {
        if (obj[k].key) obj[k].key = '••••••••';
      }
    };
    maskKeys(safe.platforms);
    maskKeys(safe.image_platforms);
    res.json(safe);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
