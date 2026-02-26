const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { 
  getPending, 
  verifyOrReject, 
  issueCertificate, 
  getStudentById,
  getApprovedCertificates,
  getRejectedCertificates,
  getIssuedCertificates
} = require('../controllers/universityController');

router.get('/pending', authMiddleware(['university']), getPending);
router.post('/verify/:id', authMiddleware(['university']), verifyOrReject);
router.post('/issue', authMiddleware(['university']), issueCertificate);
router.get('/student/:studentId', authMiddleware(['university']), getStudentById);
router.get('/approved-certificates', authMiddleware(['university']), getApprovedCertificates);
router.get('/rejected-certificates', authMiddleware(['university']), getRejectedCertificates);
router.get('/issued-certificates', authMiddleware(['university']), getIssuedCertificates);

module.exports = router;


