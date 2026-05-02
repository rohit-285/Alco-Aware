const STANDARD_DRINKS = {
  beer: { type: 'beer', volume: 330, percentage: 5, alcoholG: 13.0 },
  wine: { type: 'wine', volume: 150, percentage: 12, alcoholG: 14.2 },
  whisky: { type: 'whisky', volume: 30, percentage: 40, alcoholG: 9.5 },
  whiskey: { type: 'whiskey', volume: 30, percentage: 40, alcoholG: 9.5 },
  vodka: { type: 'vodka', volume: 30, percentage: 40, alcoholG: 9.5 },
  rum: { type: 'rum', volume: 30, percentage: 40, alcoholG: 9.5 }
};

const getBacLevel = (bac) => {
  if (bac < 0.03) return 'safe';
  if (bac < 0.06) return 'mild';
  if (bac < 0.10) return 'impaired';
  if (bac < 0.20) return 'danger';
  return 'critical';
};

const normalizeDrinks = ({ drinks, drinkType, drinkCount }) => {
  if (Array.isArray(drinks) && drinks.length) {
    return drinks.map((drink) => ({
      type: drink.type || drink.drinkType || 'custom',
      volume: Number(drink.volume || drink.volumeMl || 0),
      percentage: Number(drink.percentage ?? drink.abv ?? drink.estimatedABV ?? 0)
    })).filter((drink) => drink.volume > 0 && drink.percentage > 0);
  }

  const selectedDrink = STANDARD_DRINKS[drinkType] || STANDARD_DRINKS.beer;
  return Array.from({ length: Number(drinkCount || 1) }, () => ({ ...selectedDrink }));
};

exports.calculateBAC = (input) => {
  const {
    weight,
    gender,
    drinkingDuration = 0,
    mealType = 'light',
    hydrationLevel = 3,
    waterGlasses = 0,
    toleranceLevel = 3,
    drinkingFrequency = 'occasional'
  } = input;

  const parsedWeight = Number(weight);
  const r = gender === 'male' ? 0.68 : 0.55;
  const drinks = normalizeDrinks(input);
  const totalAlcoholG = drinks.reduce((sum, drink) => {
    return sum + (drink.volume * (drink.percentage / 100) * 0.789);
  }, 0);

  const mealAbsorption = { empty: 1.08, light: 0.95, heavy: 0.82 }[mealType] || 0.95;
  const parsedWaterGlasses = Number.isFinite(Number(waterGlasses)) ? Number(waterGlasses) : Number(hydrationLevel || 3) - 1;
  const hydrationModifier = Math.max(0.96, 1 - (Math.min(6, Math.max(0, parsedWaterGlasses)) * 0.006));
  const rawBAC = (totalAlcoholG / (parsedWeight * 1000 * r)) * 100;
  const adjustedBAC = rawBAC * mealAbsorption * hydrationModifier;
  const metabolismRate = 0.015;
  const elapsedMetabolismHours = Math.max(0, Number(drinkingDuration || 0) * 0.5);
  const bac = Math.max(0, adjustedBAC - (metabolismRate * elapsedMetabolismHours));
  const roundedBAC = Number(bac.toFixed(3));
  const hoursToSober = Number((roundedBAC / metabolismRate).toFixed(2));
  const decayCurve = Array.from({ length: Math.min(25, Math.ceil(hoursToSober) + 1) }, (_, i) => ({
    hour: i,
    bac: Number(Math.max(0, roundedBAC - (metabolismRate * i)).toFixed(4))
  }));

  return {
    bac: roundedBAC,
    currentBAC: roundedBAC,
    bacLevel: getBacLevel(roundedBAC),
    totalAlcoholG: Number(totalAlcoholG.toFixed(1)),
    drinkVolume: drinks.reduce((sum, drink) => sum + drink.volume, 0),
    drinks,
    hoursToSober,
    decayCurve,
    calories: Math.round(totalAlcoholG * 7),
    impairmentNote: Number(toleranceLevel) >= 4 || drinkingFrequency === 'frequent'
      ? 'Regular drinking may hide impairment, but it does not lower BAC.'
      : 'BAC is an estimate based on alcohol amount, body water, food, and time.'
  };
};
