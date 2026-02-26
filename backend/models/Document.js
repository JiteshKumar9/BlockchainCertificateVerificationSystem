const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  universityName: String,
  date: String,
  title: String,
  filePath: String,
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  rejectionReason: { type: String },
});

module.exports = mongoose.model('Document', documentSchema);


