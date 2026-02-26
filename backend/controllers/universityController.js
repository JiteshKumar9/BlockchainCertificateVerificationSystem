const Document = require('../models/Document');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const QRCode = require('qrcode');
const { generateCertificateHash } = require('../utils/certificateHash');

function generateId() {
  return 'CERT-' + Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
}

exports.getPending = async (req, res) => {
  try {
    const docs = await Document.find({ status: 'Pending' }).sort({ _id: -1 });
    res.json(docs);
  } catch (e) { res.status(500).json({ message: 'Failed to fetch pending' }); }
};

exports.verifyOrReject = async (req, res) => {
  const { id } = req.params;
  const { action, reason } = req.body; // 'verify' | 'reject'
  try {
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    if (action === 'reject') {
      doc.status = 'Rejected';
      doc.rejectionReason = reason || 'Not specified';
      await doc.save();
      return res.json({ ok: true });
    }
    // verify -> create certificate
    const certificateId = generateId();
    const verifyUrl = `${process.env.PUBLIC_BASE_URL || 'http://localhost:5173'}/certificate/${certificateId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl);
    
    // Get student details
    const student = await User.findById(doc.userId);
    const studentId = student ? student.studentId : null;
    
    const certificateData = {
      certificateId,
      userId: doc.userId,
      studentId,
      studentName: doc.name,
      certificateType: doc.title,
      universityName: doc.universityName,
      date: doc.date,
      title: doc.title,
      description: doc.title, // Use title as description for now
      issuedBy: req.user.id,
      qrCodeDataUrl,
      source: 'Approved',
      status: 'Verified',
      issueDate: new Date()
    };
    
    // Generate certificate hash
    certificateData.certificateHash = generateCertificateHash(certificateData);
    
    await Certificate.create(certificateData);
    doc.status = 'Verified';
    await doc.save();
    res.json({ certificateId });
  } catch (e) { res.status(500).json({ message: 'Verification failed' }); }
};

exports.issueCertificate = async (req, res) => {
  try {
    const { studentId, certificateName, issueDate, description, universityName } = req.body;
    
    // Validate that the Student ID exists
    const student = await User.findOne({ studentId, role: 'student' });
    if (!student) {
      return res.status(400).json({ message: 'Invalid Student ID. Student not found.' });
    }
    
    const certificateId = generateId();
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify({ certificateId }));
    
    const certificateData = {
      certificateId,
      userId: student._id,
      studentId,
      studentName: student.name,
      certificateType: certificateName,
      universityName: universityName || req.user.name,
      date: issueDate,
      title: certificateName,
      description,
      issuedBy: req.user.id,
      qrCodeDataUrl,
      source: 'Issued',
      issueDate: new Date(issueDate)
    };
    
    // Generate certificate hash
    certificateData.certificateHash = generateCertificateHash(certificateData);
    
    const cert = await Certificate.create(certificateData);
    res.json(cert);
  } catch (e) { res.status(500).json({ message: 'Issue failed' }); }
};

// New function to get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findOne({ studentId, role: 'student' });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ 
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch student' });
  }
};

// Get approved certificates
exports.getApprovedCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      issuedBy: req.user.id,
      status: 'Verified',
      source: 'Approved'
    }).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch approved certificates' });
  }
};

// Get rejected certificates
exports.getRejectedCertificates = async (req, res) => {
  try {
    const documents = await Document.find({ 
      status: 'Rejected'
    }).sort({ updatedAt: -1 });
    res.json(documents);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch rejected certificates' });
  }
};

// Get issued certificates
exports.getIssuedCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      issuedBy: req.user.id,
      source: 'Issued'
    }).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch issued certificates' });
  }
};


