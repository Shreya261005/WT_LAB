const express = require('express');
const app = express();

app.use(express.json());

// Home route (FIX)
app.get('/', (req, res) => {
    res.send('Welcome to My REST API 🚀');
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});