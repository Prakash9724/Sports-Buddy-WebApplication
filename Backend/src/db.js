const mongoose = require('mongoose');

// MongoDB connection function banao
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB se connection successful ho gaya: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB se connect karne mein error: ${error.message}`);
        process.exit(1);
    }
};

// Function ko export karo
module.exports = connectDB;
