const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  consumed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Otp', otpSchema);


