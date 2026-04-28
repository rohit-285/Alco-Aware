const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { calculate } = require('../controllers/calculateController');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');

router.post('/',
  apiLimiter,
  [
    body('weight').isFloat({ min: 30, max: 200 }).withMessage('Weight must be between 30 and 200 kg'),
    body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('experience').isIn(['first', 'occasional', 'experienced']).withMessage('Invalid experience level'),
    body('drinkType').isIn(['beer', 'wine', 'whisky', 'vodka', 'rum']).withMessage('Invalid drink type'),
    body('drinkCount').isInt({ min: 1, max: 15 }).withMessage('Drink count must be between 1 and 15')
  ],
  validate,
  calculate
);

module.exports = router;
