const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { 
  check, 
  getAllCertificates, 
  verifyCertificateHash, 
  getCertificateStats 
} = require('../controllers/verifierController');

// Public route for basic certificate verification
router.get('/check/:certificateId', check);

// Protected routes for verifier dashboard
router.get('/certificates', authMiddleware(['verifier']), getAllCertificates);
router.get('/verify/:certificateId', authMiddleware(['verifier']), verifyCertificateHash);
router.get('/stats', authMiddleware(['verifier']), getCertificateStats);

module.exports = router;


