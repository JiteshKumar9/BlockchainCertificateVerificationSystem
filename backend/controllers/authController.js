const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });
    
    const hashed = await bcrypt.hash(password, 10);
    
    // Generate unique student ID only for students
    let studentId;
    if (role === 'student') {
      try {
        const { generateUniqueStudentId } = require('../utils/studentIdGenerator');
        studentId = await generateUniqueStudentId();
      } catch (error) {
        console.error('Error generating student ID:', error);
        return res.status(500).json({ message: 'Failed to generate student ID' });
      }
    }
    
    const userData = { 
      name, 
      email, 
      password: hashed, 
      role
    };

    if (role === 'student' && studentId) {
      userData.studentId = studentId;
    }

    const user = await User.create(userData);
    
    res.json({ 
      id: user._id, 
      studentId: user.studentId,
      role: user.role 
    });
  } catch (e) {
    console.error('Registration error:', e);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name });
  } catch (e) {
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.authMiddleware = (roles = []) => (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if (roles.length && !roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await Otp.create({ email, code, expiresAt });

    const transporter = createTransport();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset OTP – Blockchain Certificate Verification System',
      text: `Your OTP is ${code}, valid for 5 minutes.`,
      html: `<p>Your OTP is <b>${code}</b>, valid for <b>5 minutes</b>.</p>`
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email, code: otp, consumed: false }).sort({ _id: -1 });
    if (!record) return res.status(400).json({ message: 'Invalid OTP' });
    if (record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' });
    record.verified = true;
    await record.save();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lastOtp = await Otp.findOne({ email }).sort({ _id: -1 });
    if (!lastOtp || !lastOtp.verified || lastOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP verification required' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    lastOtp.consumed = true;
    await lastOtp.save();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to reset password' });
  }
};


