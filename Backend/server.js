require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (using local instance)
mongoose.connect('mongodb://localhost:27017/bank-management')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Make sure MongoDB is running locally on port 27017');
    process.exit(1); // Exit if cannot connect to DB
});

// Routes
app.use('/api/accounts', accountRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Bank Management System API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
