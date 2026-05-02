const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, select: false },
  passwordSalt: { type: String, select: false },
  googleId: { type: String, index: true },
  avatar: String,
  provider: { type: String, enum: ['password', 'google'], default: 'password' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
