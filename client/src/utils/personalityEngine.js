const personalities = [
  { emoji: '🧠', name: 'The Philosopher',  desc: "Solving the universe. One sip at a time." },
  { emoji: '😂', name: 'The Comedian',     desc: "Every sentence now ends with 'get it??'" },
  { emoji: '💃', name: 'The Dancer',       desc: "Dancing to music only you can hear." },
  { emoji: '😭', name: 'The Emotional',    desc: "Hugging strangers. Crying about nothing." },
  { emoji: '📱', name: 'The Texter',       desc: "Composing a 3-paragraph text to your ex." },
  { emoji: '👑', name: 'The Motivator',    desc: "Giving TED Talks to the bathroom mirror." },
  { emoji: '🍕', name: 'The Foodie',       desc: "Ordering everything on the menu. Twice." },
  { emoji: '🕵️', name: 'The Conspiracy',   desc: "Explaining how it's all connected." },
  { emoji: '🎤', name: 'The Karaoke King', desc: "Every song is your song now." }
];

export const generatePersonality = () => {
  const randomIndex = Math.floor(Math.random() * personalities.length);
  return personalities[randomIndex];
};
