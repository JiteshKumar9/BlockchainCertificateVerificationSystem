const crypto = require('crypto');

/**
 * Generates SHA256 hash of certificate details for verification
 * @param {Object} certificateData - Certificate data object
 * @returns {string} SHA256 hash
 */
function generateCertificateHash(certificateData) {
  // Create a string with all certificate details
  const dataString = JSON.stringify({
    certificateId: certificateData.certificateId,
    studentId: certificateData.studentId,
    studentName: certificateData.studentName,
    certificateType: certificateData.certificateType,
    universityName: certificateData.universityName,
    date: certificateData.date,
    title: certificateData.title,
    description: certificateData.description,
    issuedBy: certificateData.issuedBy,
    issueDate: certificateData.issueDate
  });
  
  // Generate SHA256 hash
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

module.exports = { generateCertificateHash };
