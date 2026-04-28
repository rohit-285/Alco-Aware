const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewController');
const { validate } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');

router.post('/',
  apiLimiter,
  [
    body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
  ],
  validate,
  createReview
);

router.get('/', getReviews);

module.exports = router;
