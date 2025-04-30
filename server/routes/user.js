// src/routes/user.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const {verifyToken} = require('../middleware/auth');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// GET user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching user profile' });
  }
});

// UPDATE user profile
router.put('/profile', verifyToken, upload.single('photo'), async (req, res) => {
  const updates = {
    bio: req.body.bio,
    location: req.body.location,
  };

  if (req.file) {
    updates.photo = req.file.filename;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating profile' });
  }
});

module.exports = router;
