const User = require('../models/User');

exports.savePost = async (req, res) => {
  const { post } = req.body;
  const user = await User.findById(req.user.id);

  user.savedPosts.push(post);
  user.notifications.push({ message: "You saved a post!" });
  user.credits += 5;

  await user.save();
  res.json({ msg: "Post saved!", credits: user.credits });
};

exports.reportPost = async (req, res) => {
  try {
    const { post } = req.body;
    const user = await User.findById(req.user.id);

    // User reporting logic
    user.notifications.push({ message: "You reported a post!" });
    user.credits += 2;
    await user.save();

    // Admin handling
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      admin.reportedPosts = admin.reportedPosts || [];
      admin.reportedPosts.push(post);

      admin.notifications.push({
        message: `A post was reported: ${post.title}`,
        date: new Date(),
      });

      await admin.save();
    }

    res.json({ msg: "Post reported!", credits: user.credits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error reporting post" });
  }
};

exports.getNotifications = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.notifications.reverse()); // latest first
};

