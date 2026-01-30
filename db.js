const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
