const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    state: 'Delhi',
    legalBAC: 0.03,
    isDry: false,
    dryDays: ['Oct 2'],
    note: 'Location is estimated. Always verify current local law.'
  });
});

module.exports = router;
