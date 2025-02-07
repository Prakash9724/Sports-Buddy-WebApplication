const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const errorHandler = require('./src/middlewares/errorMiddleware');

// Routes import karo
const userRoutes = require('./src/routes/user.routes');
const adminRoutes = require('./src/routes/admin.routes'); 
const eventRoutes = require('./src/routes/event.routes');

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://sports-buddy-webapplication.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log("MongoDB Atlas se connect ho gaya");
    // Log the connection string (without password)
    const sanitizedUri = process.env.MONGODB_URI.replace(
        /mongodb\+srv:\/\/(.*):(.*)@/,
        'mongodb+srv://$1:****@'
    );
    console.log('Connected to:', sanitizedUri);
})
.catch(err => {
    console.error("MongoDB Atlas se connect karne mein error:", err.message);
    process.exit(1);
});

// Connection events for monitoring
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Models register karo
require('./src/models/user.model');
require('./src/models/event.model');

// Routes setup karo
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

// Error handling middleware (add this after all routes)
app.use(errorHandler);

// Basic route
app.get('/', (req, res) => {
    res.send('Event Management System API chal raha hai');
});

// Server start karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server port ${PORT} pe chal raha hai`);
});
