const router = require('express').Router();
const { getUserDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { verifyToken } = require('../middleware/auth');

router.get('/user', verifyToken, getUserDashboard);
router.get('/admin', verifyToken, getAdminDashboard);

module.exports = router;
