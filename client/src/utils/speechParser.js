const DRINK_KEYWORDS = {
  'large beer': { type: 'beer', volume: 650, percentage: 5 },
  beer: { type: 'beer', volume: 330, percentage: 5 },
  whiskey: { type: 'whiskey', volume: 60, percentage: 40 },
  whisky: { type: 'whisky', volume: 60, percentage: 40 },
  vodka: { type: 'vodka', volume: 60, percentage: 40 },
  wine: { type: 'wine', volume: 150, percentage: 12 },
  shot: { type: 'shot', volume: 30, percentage: 40 },
  rum: { type: 'rum', volume: 60, percentage: 40 }
};

const NUMBER_WORDS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  a: 1,
  an: 1
};

export const parseDrinksFromSpeech = (text) => {
  const lowerText = String(text || '').toLowerCase();
  const drinks = [];

  Object.entries(DRINK_KEYWORDS).forEach(([keyword, drink]) => {
    const regex = new RegExp(`(\\w+)\\s+${keyword}s?`, 'g');
    let match;
    while ((match = regex.exec(lowerText)) !== null) {
      const count = NUMBER_WORDS[match[1]] || Number.parseInt(match[1], 10) || 1;
      for (let i = 0; i < count; i += 1) {
        drinks.push({ ...drink });
      }
    }
  });

  return drinks;
};
