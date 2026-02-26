// MongoDB initialization script
db = db.getSiblingDB('certdb');

// Create collections if they don't exist
db.createCollection('users');
db.createCollection('certificates');
db.createCollection('documents');
db.createCollection('otps');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "studentId": 1 }, { sparse: true });
db.certificates.createIndex({ "certificateId": 1 }, { unique: true });
db.certificates.createIndex({ "studentId": 1 });
db.certificates.createIndex({ "issueDate": -1 });

print('MongoDB initialized successfully!');
print('Database: certdb');
print('Collections: users, certificates, documents, otps');
print('Indexes created for performance');
