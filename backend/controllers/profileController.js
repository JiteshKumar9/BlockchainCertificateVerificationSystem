const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`),
});

exports.avatarUpload = multer({ storage }).single('profilePicture');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};
    const { name, email, password } = req.body;
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (req.file) updates.profilePicture = `/uploads/${req.file.filename}`;
    if (password) updates.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};


