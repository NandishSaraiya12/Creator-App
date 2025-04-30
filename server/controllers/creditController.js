const User = require('../models/User');

exports.dailyLogin = async (req, res) => {
  const user = await User.findById(req.user.id);

  // You could add check for "already logged in today" here (future enhancement)
  user.credits += 10; // +10 credits for daily login
  await user.save();
  
  res.json({ credits: user.credits });
};

exports.completeProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.name && user.photo) {
    user.credits += 50; // +50 credits for profile completed
    await user.save();
  }
  res.json({ credits: user.credits });
};

exports.interact = async (req, res) => {
  const { type } = req.body; // 'save' or 'report'

  const user = await User.findById(req.user.id);

  if (type === 'save') user.credits += 5; // +5 for saving post
  else if (type === 'report') user.credits += 2; // +2 for reporting post

  await user.save();
  res.json({ credits: user.credits });
};
