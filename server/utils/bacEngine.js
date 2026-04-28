/**
 * Calculates Blood Alcohol Content strictly following the Widmark Formula
 * @param {Object} input - { weight, gender, drinkType, drinkCount }
 */
exports.calculateBAC = ({ weight, gender, drinkType, drinkCount }) => {
  // Constants
  const r = gender === 'male' ? 0.68 : 0.55;
  const weightGrams = weight * 1000;

  // Drink type to alcohol grams (based on standard drinks in prompt)
  const standardDrinks = {
    beer: { volume: 330, abv: 0.05, alcoholG: 13.0 },
    wine: { volume: 150, abv: 0.12, alcoholG: 14.2 },
    whisky: { volume: 30, abv: 0.40, alcoholG: 9.5 },
    vodka: { volume: 30, abv: 0.40, alcoholG: 9.5 },
    rum: { volume: 30, abv: 0.40, alcoholG: 9.5 }
  };

  const selectedDrink = standardDrinks[drinkType];
  const totalAlcoholG = selectedDrink.alcoholG * drinkCount;
  const drinkVolume = selectedDrink.volume * drinkCount;

  // Widmark formula
  // BAC = (A / (W × r)) × 100
  let bac = (totalAlcoholG / (weightGrams * r)) * 100;

  // Round to 3 decimal places
  bac = Math.max(0, Number(bac.toFixed(3)));

  // Determine Level
  let bacLevel = 'safe';
  if (bac < 0.03) bacLevel = 'safe';
  else if (bac < 0.06) bacLevel = 'mild';
  else if (bac < 0.10) bacLevel = 'impaired';
  else if (bac < 0.20) bacLevel = 'danger';
  else bacLevel = 'critical';

  return { bac, bacLevel, totalAlcoholG, drinkVolume };
};
