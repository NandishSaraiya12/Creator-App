const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashed,
    role: 'user',
    photo: req.file?.filename
  });

  if (user.name && user.email && user.password && user.photo) {
    user.credits = 50; // 🎯 +50 credits for completing profile at registration
  } else {
    user.credits = 0;
  }

  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

  const today = new Date();
  if (!user.lastLoginDate || user.lastLoginDate.toDateString() !== today.toDateString()) {
    user.credits = (user.credits || 0) + 10; // if credits field is undefined, start with 0
    user.lastLoginDate = today;
    await user.save();
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user });
};
