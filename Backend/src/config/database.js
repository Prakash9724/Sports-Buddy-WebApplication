const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/event-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB se connect ho gaya");
  } catch (error) {
    console.log("MongoDB se connect karne mein error:", error);
    process.exit(1);
  }
};

module.exports = connectDB; 