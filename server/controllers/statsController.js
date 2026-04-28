const Calculation = require('../models/Calculation');
const Review = require('../models/Review');
const { successResponse } = require('../utils/responseHelper');

exports.getStats = async (req, res, next) => {
  try {
    const totalCalculations = await Calculation.countDocuments();
    const totalReviews = await Review.countDocuments();

    // Average BAC
    const avgBACResult = await Calculation.aggregate([
      { $group: { _id: null, avgBAC: { $avg: '$bac' } } }
    ]);
    const avgBAC = avgBACResult.length > 0 ? Number(avgBACResult[0].avgBAC.toFixed(3)) : 0;

    // Most popular drink
    const drinkTypeBreakdown = await Calculation.aggregate([
      { $group: { _id: '$drinkType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const mostPopularDrink = drinkTypeBreakdown.length > 0 ? drinkTypeBreakdown[0]._id : 'None';

    // BAC Level breakdown
    const bacLevelBreakdown = await Calculation.aggregate([
      { $group: { _id: '$bacLevel', count: { $sum: 1 } } }
    ]);

    // Calculations over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const calculationsPerDay = await Calculation.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return successResponse(res, 200, {
      totalCalculations,
      avgBAC,
      mostPopularDrink,
      totalReviews,
      drinkTypeBreakdown,
      bacLevelBreakdown,
      calculationsPerDay
    }, 'Stats fetched successfully');
  } catch (err) {
    next(err);
  }
};
