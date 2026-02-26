const User = require('../models/User');

/**
 * Generates a unique 10-digit alphanumeric student ID
 * Format: STU + 7 random alphanumeric characters
 * @returns {Promise<string>} Unique student ID
 */
async function generateUniqueStudentId() {
  let studentId;
  let isUnique = false;
  
  while (!isUnique) {
    // Generate STU + 7 random alphanumeric characters
    const randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
    studentId = `STU${randomPart}`;
    
    // Check if this ID already exists
    const existingUser = await User.findOne({ studentId });
    if (!existingUser) {
      isUnique = true;
    }
  }
  
  return studentId;
}

module.exports = { generateUniqueStudentId };
