const User = require('../models/User');

exports.getUserDashboard = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) return res.status(404).json({ msg: 'User not found' });

  res.json({
    credits: user.credits,
    savedPosts: user.savedPosts,
    notifications: user.notifications.slice(-5).reverse(), // latest 5
  });
};

exports.getAdminDashboard = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });

  const users = await User.find().select('-password');
  const totalCredits = users.reduce((acc, u) => acc + u.credits, 0);

  // Collect all reportedPosts across admins
  const allReported = user.reportedPosts || [];

  res.json({
    totalUsers: users.length,
    totalCredits,
    users,
    reportedPosts: allReported,
    notifications: user.notifications.slice(-5).reverse(),
  });
};

exports.savePost = async (req, res) => {
  try {
    const { post } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Check for duplicates based on post URL (or title)
    const alreadySaved = user.savedPosts.some(p => p.url === post.url);
    if (alreadySaved) return res.status(400).json({ msg: 'Post already saved' });

    user.savedPosts.push(post);

    // Add optional notification
    user.notifications.push({
      message: `Saved a post: ${post.title}`,
      date: new Date(),
    });

    await user.save();

    res.json({ msg: 'Post saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error saving post' });
  }
};
