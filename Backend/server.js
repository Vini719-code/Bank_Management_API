require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = 8000; // Use port 8000 - standard and should be free

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:3000', 
       'https://bank-management-api-cs3a.vercel.app/'
        // Add your Vercel frontend URL here
        // Example: 'https://your-app.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://bankapp:bankapp123@cluster0.mongodb.net/bank-management?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Running in demo mode without database');
});

// Routes
app.use('/api/accounts', accountRoutes);

// Handle pre-flight requests
app.options('*', cors());

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bank Management System API is running',
        port: PORT 
    });
});

// Get port info
app.get('/port', (req, res) => {
    res.json({ port: PORT });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Backend URL: http://localhost:${PORT}`);
});
