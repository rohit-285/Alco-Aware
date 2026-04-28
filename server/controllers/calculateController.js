const { calculateBAC } = require('../utils/bacEngine');
const Calculation = require('../models/Calculation');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.calculate = async (req, res, next) => {
  try {
    const { weight, gender, experience, drinkType, drinkCount } = req.body;

    // Calculate BAC
    const { bac, bacLevel, totalAlcoholG, drinkVolume } = calculateBAC({
      weight,
      gender,
      drinkType,
      drinkCount
    });

    // Save calculation to DB
    const calculation = await Calculation.create({
      weight,
      gender,
      experience,
      drinkType,
      drinkCount,
      bac,
      bacLevel,
      totalAlcoholG
    });

    return successResponse(res, 201, {
      bac,
      bacLevel,
      totalAlcoholG,
      drinkVolume,
      id: calculation._id
    }, 'BAC Calculated successfully');
  } catch (err) {
    next(err);
  }
};
