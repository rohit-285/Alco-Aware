const express = require('express');
const Calculation = require('../models/Calculation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [summary] = await Calculation.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, avgBAC: { $avg: '$bac' }, totalSessions: { $sum: 1 }, avgDrinks: { $avg: '$drinkCount' } } }
    ]);
    res.json({ insights: summary || { avgBAC: 0, totalSessions: 0, avgDrinks: 0 }, timestamp: new Date() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
