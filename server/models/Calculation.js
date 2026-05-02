const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  weight: { type: Number, required: true, min: 30, max: 200 },
  gender: { type: String, enum: ['male', 'female'], required: true },
  experience: { type: String, enum: ['first', 'occasional', 'experienced'], required: true },
  drinkType: { type: String, enum: ['beer', 'wine', 'whisky', 'whiskey', 'vodka', 'rum', 'custom'], default: 'custom' },
  drinkCount: { type: Number, required: true, min: 1, max: 30 },
  drinkingDuration: { type: Number, default: 0 },
  mealType: { type: String, enum: ['empty', 'light', 'heavy'], default: 'light' },
  hydrationLevel: { type: Number, default: 3 },
  waterGlasses: { type: Number, default: 0 },
  toleranceLevel: { type: Number, default: 3 },
  drinkingFrequency: { type: String, enum: ['rare', 'occasional', 'weekly', 'frequent'], default: 'occasional' },
  drinks: [{
    type: { type: String },
    volume: Number,
    percentage: Number
  }],
  bac: { type: Number, required: true },
  bacLevel: { type: String, enum: ['safe', 'mild', 'impaired', 'danger', 'critical'], required: true },
  totalAlcoholG: { type: Number },
  hoursToSober: { type: Number },
  calories: { type: Number },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Calculation', calculationSchema);
