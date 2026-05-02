const express = require('express');

const router = express.Router();

router.post('/advice', async (req, res) => {
  const { userPlan = '', userProfile = {} } = req.body;
  const weight = userProfile.weight || 'unknown';
  const gender = userProfile.gender || 'unknown';

  res.json({
    advice: `For this plan: "${userPlan}", pace at no more than one standard drink per hour, eat a real meal first, alternate each drink with water, set transport before you start, and stop early if your BAC estimate approaches 0.06%. Profile considered: ${weight}kg, ${gender}.`
  });
});

module.exports = router;
