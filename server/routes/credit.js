const router = require('express').Router();
const { dailyLogin, completeProfile, interact } = require('../controllers/creditController');
const { verifyToken } = require('../middleware/auth');

router.post('/daily-login', verifyToken, dailyLogin);
router.post('/complete-profile', verifyToken, completeProfile);
router.post('/interact', verifyToken, interact);

module.exports = router;
