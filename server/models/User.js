const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  photo: String,
  bio: String,
  location: String,
  credits: { type: Number, default: 0 },
  savedPosts: [Object],
  notifications: [{
    message: String,
    date: { type: Date, default: Date.now },
  }],
  lastLoginDate: { type: Date }, // ⭐ NEW: to track daily login bonus
  reportedPosts: {
    type: [Object],
    default: [],
  },
}, { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
