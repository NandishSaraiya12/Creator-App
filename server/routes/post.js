const router = require('express').Router();
const { savePost, reportPost, getNotifications } = require('../controllers/postController');
const { verifyToken } = require('../middleware/auth');

router.post('/save', verifyToken, savePost);
router.post('/report', verifyToken, reportPost);
router.get('/notifications', verifyToken, getNotifications);

module.exports = router;
