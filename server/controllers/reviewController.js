const Review = require('../models/Review');
const { successResponse } = require('../utils/responseHelper');

exports.createReview = async (req, res, next) => {
  try {
    const { name, rating, comment } = req.body;
    const review = await Review.create({ name, rating, comment });
    return successResponse(res, 201, review, 'Review created successfully');
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const startIndex = (page - 1) * limit;

    const total = await Review.countDocuments();
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    return successResponse(res, 200, {
      reviews,
      total,
      page,
      pages: Math.ceil(total / limit)
    }, 'Reviews fetched successfully');
  } catch (err) {
    next(err);
  }
};
