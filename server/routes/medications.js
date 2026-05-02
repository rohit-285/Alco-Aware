const express = require('express');
const interactions = require('../data/medicationInteractions');

const router = express.Router();

router.post('/check', (req, res) => {
  const names = (req.body.medications || []).map((name) => String(name).toLowerCase());
  const matches = interactions.filter((item) => names.some((name) => item.name.toLowerCase().includes(name) || name.includes(item.name.toLowerCase())));
  res.json({ interactions: matches });
});

module.exports = router;
