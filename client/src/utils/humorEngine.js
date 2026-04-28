export const getHumorMessages = (drinkCount, bac, experience) => {
  const getPool = () => {
    if (bac > 0.20) {
      return [
        "This is no longer a joke. Please seek help.",
        "Your BAC is in emergency territory. Stop drinking completely.",
        "Consider calling a friend or an ambulance right now."
      ];
    }
    if (bac > 0.10) {
      return [
        "Your BAC would like a word. So would your doctor.",
        "You are legally prohibited from making any important decisions.",
        "Time to switch to water. Specifically, a gallon of it."
      ];
    }
    if (drinkCount >= 6) {
      return [
        "At this point, you ARE the entertainment.",
        "Tomorrow morning is already plotting its revenge.",
        "Are you still drinking, or just aggressively holding your glass?"
      ];
    }
    if (drinkCount >= 3) {
      return [
        "Your friends are keeping one eye on you. Wisely.",
        "You're entering the 'I love everyone' phase of the night.",
        "Suddenly, that fast food place looks like a Michelin star restaurant."
      ];
    }
    if (drinkCount > 0) {
      if (experience === 'first') {
        return [
          "Two in and you're already a philosopher. Welcome.",
          "Taking it easy! A wise choice for the uninitiated.",
          "Remember: It's a marathon, not a sprint."
        ];
      }
      return [
        "Warm-up lap complete. Your liver isn't even worried.",
        "Comfortably buzzed, like a bee on a weekend.",
        "The night is young, but pace yourself."
      ];
    }
    // Sober
    return [
      "Still sober. You're tonight's designated historian.",
      "Your liver sends its regards and thanks you.",
      "The designated sober friend: an unsung hero."
    ];
  };

  const pool = getPool();
  // Shuffle array and pick first 2-3
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // returns 2 or 3
};
