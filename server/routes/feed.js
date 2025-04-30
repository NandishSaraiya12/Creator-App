const router = require('express').Router();
const { getFeed } = require('../controllers/feedController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getFeed);

module.exports = router;
