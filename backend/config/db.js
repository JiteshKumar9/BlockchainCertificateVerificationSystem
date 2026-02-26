const mongoose = require('mongoose');

module.exports = async function connectDb() {
  // Try different connection strings in order of preference
  const connectionStrings = [
    process.env.MONGO_URI, // Custom MongoDB URI from environment
    'mongodb://admin:password123@127.0.0.1:27017/certdb?authSource=admin', // Docker setup
    'mongodb://127.0.0.1:27017/certdb', // Local MongoDB without auth
    'mongodb://localhost:27017/certdb' // Alternative local connection
  ];

  let connected = false;
  let lastError = null;

  for (const uri of connectionStrings) {
    if (!uri) continue;
    
    try {
      console.log(`Attempting to connect to MongoDB: ${uri.replace(/\/\/.*@/, '//***:***@')}`);
      
      await mongoose.connect(uri, {
        dbName: 'certdb',
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        socketTimeoutMS: 45000, // 45 second timeout
        // Removed deprecated bufferMaxEntries option
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      connected = true;
      console.log('✅ MongoDB connected successfully!');
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
      console.log(`🔌 Connection: ${mongoose.connection.host}:${mongoose.connection.port}`);
      break;
      
    } catch (err) {
      lastError = err;
      console.log(`❌ Connection failed: ${err.message}`);
      
      // Close any existing connection before trying next
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    }
  }

  if (!connected) {
    console.error('❌ All MongoDB connection attempts failed!');
    console.error('Last error:', lastError?.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Ensure MongoDB is running');
    console.log('2. Check if MongoDB service is started');
    console.log('3. Verify connection string in .env file');
    console.log('4. Try running: docker-compose up -d (if using Docker)');
    console.log('5. Check MongoDB logs for errors');
    
    process.exit(1);
  }

  // Handle connection events
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      console.error('Error during MongoDB shutdown:', err);
      process.exit(1);
    }
  });
};


