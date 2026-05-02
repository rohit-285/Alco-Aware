const { calculateBAC } = require('../utils/bacEngine');
const Calculation = require('../models/Calculation');
const { successResponse } = require('../utils/responseHelper');

exports.calculate = async (req, res, next) => {
  try {
    const {
      weight,
      gender,
      experience = 'occasional',
      drinkType = 'custom',
      drinkCount,
      drinkingDuration = 0,
      mealType = 'light',
      hydrationLevel = 3,
      waterGlasses = 0,
      toleranceLevel = 3,
      drinkingFrequency = 'occasional',
      drinks
    } = req.body;

    const result = calculateBAC({
      weight,
      gender,
      drinkingDuration,
      mealType,
      hydrationLevel,
      waterGlasses,
      toleranceLevel,
      drinkingFrequency,
      drinkType,
      drinkCount,
      drinks
    });

    let calculation = null;
    try {
      calculation = await Calculation.create({
        weight,
        gender,
        experience,
        drinkType,
        drinkCount: result.drinks.length,
        drinkingDuration,
        mealType,
        hydrationLevel,
        waterGlasses,
        toleranceLevel,
        drinkingFrequency,
        drinks: result.drinks,
        bac: result.bac,
        bacLevel: result.bacLevel,
        totalAlcoholG: result.totalAlcoholG,
        hoursToSober: result.hoursToSober,
        calories: result.calories
      });
    } catch (saveError) {
      console.error('Calculation save failed:', saveError.message);
    }

    return successResponse(res, 201, {
      ...result,
      id: calculation?._id || null
    }, 'BAC Calculated successfully');
  } catch (err) {
    next(err);
  }
};
