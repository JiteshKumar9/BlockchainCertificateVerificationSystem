const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const Certificate = require('../models/Certificate');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

exports.uploadMiddleware = multer({ storage }).single('file');

exports.uploadDocument = async (req, res) => {
  try {
    const { name, universityName, date, title } = req.body;
    const doc = await Document.create({
      userId: req.user.id,
      name,
      universityName,
      date,
      title,
      filePath: req.file ? `/uploads/${req.file.filename}` : undefined,
      status: 'Pending',
    });
    res.json({ id: doc._id });
  } catch (e) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const [verified, pending] = await Promise.all([
      Certificate.find({ userId: req.user.id }).sort({ _id: -1 }),
      Document.find({ userId: req.user.id, status: 'Pending' }).sort({ _id: -1 }),
    ]);
    res.json({ verified, pending });
  } catch (e) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

// New function to get student profile with student ID
exports.getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      profilePicture: user.profilePicture
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// New function to get certificates by student ID
exports.getCertificatesByStudentId = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const certificates = await Certificate.find({ studentId: user.studentId })
      .sort({ issueDate: -1 });
    
    res.json(certificates);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};


