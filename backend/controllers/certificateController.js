const Certificate = require('../models/Certificate');
const Document = require('../models/Document');

exports.getCertificates = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === 'student') {
      const list = await Certificate.find({ userId: req.user.id }).sort({ issueDate: -1 });
      return res.json({ certificates: list });
    }
    if (role === 'university') {
      const approved = await Certificate.find({}).sort({ issueDate: -1 });
      const rejected = await Document.find({ status: 'Rejected' }).sort({ _id: -1 });
      return res.json({ approved, rejected });
    }
    if (role === 'verifier') {
      const verified = await Certificate.find({ status: { $in: [undefined, 'Verified'] } }).sort({ issueDate: -1 });
      return res.json({ verified });
    }
    res.json({ certificates: [] });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { certificateId, status } = req.body; // e.g., Verified | Revoked
    const cert = await Certificate.findOneAndUpdate({ certificateId }, { status }, { new: true });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update certificate' });
  }
};

// New function to get certificates by student ID
exports.getCertificatesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const certificates = await Certificate.find({ studentId }).sort({ issueDate: -1 });
    res.json({ certificates });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};

// New function to verify certificate hash
exports.verifyCertificateHash = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId });
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Generate current hash to compare
    const { generateCertificateHash } = require('../utils/certificateHash');
    const currentHash = generateCertificateHash(certificate);
    
    const isValid = certificate.certificateHash === currentHash;
    
    res.json({
      isValid,
      certificate,
      currentHash,
      storedHash: certificate.certificateHash
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to verify certificate' });
  }
};


