const router = require('express').Router();
const multer = require('multer');
const { register, login } = require('../controllers/authController');
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('photo'), register);
router.post('/login', login);

module.exports = router;
