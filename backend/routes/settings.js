const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { getPdfDefaults, setPdfDefaults } = require('../controllers/settingsController');

// All authenticated roles can read the defaults
router.get('/pdf-defaults', authMiddleware(['student', 'university', 'verifier']), getPdfDefaults);
// Only university role (admin/org) can set defaults
router.post('/pdf-defaults', authMiddleware(['university']), setPdfDefaults);

module.exports = router;
