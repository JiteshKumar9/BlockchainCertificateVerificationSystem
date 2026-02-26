const router = require('express').Router();
const { authMiddleware } = require('../controllers/authController');
const { getCertificates, updateCertificate, getCertificatesByStudentId, verifyCertificateHash } = require('../controllers/certificateController');
const Certificate = require('../models/Certificate');

router.get('/get', authMiddleware([]), getCertificates);
router.post('/update', authMiddleware(['university', 'verifier']), updateCertificate);
router.get('/student/:studentId', authMiddleware(['student', 'university', 'verifier']), getCertificatesByStudentId);
router.get('/verify/:certificateId', verifyCertificateHash);

module.exports = router;

// Public fetch by certificateId
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) return res.status(404).json({ message: 'Not found' });
    res.json(cert);
  } catch (e) { res.status(500).json({ message: 'Failed' }); }
});


