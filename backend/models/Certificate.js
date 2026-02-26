const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: String, required: true, index: true }, // Student ID for linking
  studentName: String,
  certificateType: String,
  universityName: String,
  date: String,
  title: String,
  description: String, // New field for certificate description
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // University that issued it
  qrCodeDataUrl: String,
  // Source indicates how this certificate was created:
  //  - 'Approved': created by university after approving a student's uploaded document
  //  - 'Issued': created directly by university from the Issue form
  source: { type: String, enum: ['Approved', 'Issued'] },
  status: { type: String, default: 'Verified' },
  certificateHash: String, // SHA256 hash for verification
  issueDate: { type: Date, default: Date.now }, // When certificate was issued
});

module.exports = mongoose.model('Certificate', certificateSchema);


