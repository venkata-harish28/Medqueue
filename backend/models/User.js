// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['patient','doctor','admin'], default: 'patient' },
  phone: String,
  age: Number,
  gender: String,
  specialties: [String], // doctors only
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  rating: { type: Number, default: 0 },
  bio: String,
  languages: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
