const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});