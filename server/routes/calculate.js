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
    body('experience').optional().isIn(['first', 'occasional', 'experienced']).withMessage('Invalid experience level'),
    body('drinkType').optional().isIn(['beer', 'wine', 'whisky', 'whiskey', 'vodka', 'rum', 'custom']).withMessage('Invalid drink type'),
    body('drinkCount').optional().isInt({ min: 1, max: 30 }).withMessage('Drink count must be between 1 and 30'),
    body('drinks').optional().isArray({ min: 1 }).withMessage('Drinks must be an array'),
    body('drinks.*.volume').optional().isFloat({ min: 1 }).withMessage('Drink volume must be positive'),
    body('drinks.*.percentage').optional().isFloat({ min: 0.1, max: 96 }).withMessage('ABV must be valid'),
    body('drinkingDuration').optional().isFloat({ min: 0, max: 24 }).withMessage('Duration must be between 0 and 24 hours'),
    body('mealType').optional().isIn(['empty', 'light', 'heavy']).withMessage('Invalid meal type'),
    body('hydrationLevel').optional().isInt({ min: 1, max: 5 }).withMessage('Hydration must be 1 to 5'),
    body('waterGlasses').optional().isInt({ min: 0, max: 12 }).withMessage('Water glasses must be 0 to 12'),
    body('toleranceLevel').optional().isInt({ min: 1, max: 5 }).withMessage('Tolerance must be 1 to 5'),
    body('drinkingFrequency').optional().isIn(['rare', 'occasional', 'weekly', 'frequent']).withMessage('Invalid drinking frequency')
  ],
  validate,
  calculate
);

module.exports = router;
