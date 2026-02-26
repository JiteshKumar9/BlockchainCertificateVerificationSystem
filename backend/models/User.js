const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'university', 'verifier'], required: true },
  profilePicture: { type: String },
  studentId: { type: String, unique: true, sparse: true }, // Unique student ID for students only
});

module.exports = mongoose.model('User', userSchema);


