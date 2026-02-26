const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { avatarUpload, getProfile, updateProfile } = require('../controllers/profileController');

router.get('/get', authMiddleware([]), getProfile);
router.post('/update', authMiddleware([]), avatarUpload, updateProfile);

module.exports = router;


