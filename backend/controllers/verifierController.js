const Certificate = require('../models/Certificate');
const User = require('../models/User');

exports.check = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const cert = await Certificate.findOne({ certificateId });
    
    if (!cert) {
      return res.json({ 
        valid: false, 
        message: 'Certificate not found' 
      });
    }
    
    res.json({ 
      valid: true, 
      certificate: cert 
    });
  } catch (e) {
    console.error('Verifier check error:', e);
    res.status(500).json({ 
      valid: false, 
      message: 'Error verifying certificate' 
    });
  }
};

// Get all certificates for verifier dashboard
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({})
      .sort({ issueDate: -1 })
      .limit(50); // Limit to prevent overwhelming response
    
    res.json({ certificates });
  } catch (e) {
    console.error('Get certificates error:', e);
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};

// Verify certificate hash for enhanced security
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
      storedHash: certificate.certificateHash,
      message: isValid ? 'Certificate is authentic and unmodified' : 'Certificate may have been tampered with'
    });
  } catch (e) {
    console.error('Hash verification error:', e);
    res.status(500).json({ message: 'Failed to verify certificate hash' });
  }
};

// Get certificate statistics for verifier dashboard
exports.getCertificateStats = async (req, res) => {
  try {
    const [totalCertificates, verifiedCertificates, recentCertificates] = await Promise.all([
      Certificate.countDocuments(),
      Certificate.countDocuments({ status: 'Verified' }),
      Certificate.countDocuments({ 
        issueDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
      })
    ]);
    
    res.json({
      total: totalCertificates,
      verified: verifiedCertificates,
      recent: recentCertificates,
      pending: totalCertificates - verifiedCertificates
    });
  } catch (e) {
    console.error('Stats error:', e);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};


