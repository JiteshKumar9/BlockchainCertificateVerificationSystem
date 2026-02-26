const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { uploadMiddleware, uploadDocument, getCertificates, getStudentProfile, getCertificatesByStudentId } = require('../controllers/studentController');

router.post('/upload', authMiddleware(['student']), uploadMiddleware, uploadDocument);
router.get('/certificates', authMiddleware(['student']), getCertificates);
router.get('/profile', authMiddleware(['student']), getStudentProfile);
router.get('/my-certificates', authMiddleware(['student']), getCertificatesByStudentId);

module.exports = router;


