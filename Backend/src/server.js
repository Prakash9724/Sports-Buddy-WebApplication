const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes import karo
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const eventRoutes = require('./routes/event.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB se connect karo
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB se connection successful ho gaya"))
    .catch(err => console.error("MongoDB se connect karne mein error:", err));

// Routes setup karo
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Event Management System API chal raha hai');
});

// Server ko start karo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server port ${PORT} pe chal raha hai`);
});
