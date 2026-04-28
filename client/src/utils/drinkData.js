export const standardDrinks = {
  beer:   { emoji: '🍺', name: 'Beer',   abv: 5,  volume: 330, alcoholG: 13.0 },
  wine:   { emoji: '🍷', name: 'Wine',   abv: 12, volume: 150, alcoholG: 14.2 },
  whisky: { emoji: '🥃', name: 'Whisky', abv: 40, volume: 30,  alcoholG: 9.5 },
  vodka:  { emoji: '🍸', name: 'Vodka',  abv: 40, volume: 30,  alcoholG: 9.5 },
  rum:    { emoji: '🍹', name: 'Rum',    abv: 40, volume: 30,  alcoholG: 9.5 }
};

export const getDrinkDetails = (type) => standardDrinks[type];
