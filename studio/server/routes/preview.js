const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// GET /api/preview/* — serve vault files
router.get('/:filePath(*)', (req, res) => {
  const { vaultPath } = req.app.locals;
  const filePath = req.params.filePath;
  const fullPath = path.join(vaultPath, filePath);

  if (!fullPath.startsWith(vaultPath)) {
    return res.status(403).json({ error: 'Path outside vault' });
  }
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  const mimeTypes = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.webp': 'image/webp',
    '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
    '.md': 'text/markdown', '.json': 'application/json', '.txt': 'text/plain'
  };
  res.setHeader('Content-Type', mimeTypes[path.extname(fullPath).toLowerCase()] || 'application/octet-stream');
  fs.createReadStream(fullPath).pipe(res);
});

module.exports = router;
