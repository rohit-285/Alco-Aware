const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  weight: { type: Number, required: true, min: 30, max: 200 },
  gender: { type: String, enum: ['male', 'female'], required: true },
  experience: { type: String, enum: ['first', 'occasional', 'experienced'], required: true },
  drinkType: { type: String, enum: ['beer', 'wine', 'whisky', 'vodka', 'rum'], required: true },
  drinkCount: { type: Number, required: true, min: 1, max: 15 },
  bac: { type: Number, required: true },
  bacLevel: { type: String, enum: ['safe', 'mild', 'impaired', 'danger', 'critical'], required: true },
  totalAlcoholG: { type: Number },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Calculation', calculationSchema);
