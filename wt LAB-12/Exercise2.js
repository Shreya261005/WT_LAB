const express = require('express');
const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

/* ------------------ GLOBAL MIDDLEWARE ------------------ */
// Logs request details
app.use((req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`[GLOBAL] ${req.method} ${req.url} at ${time}`);
    next(); // move to next middleware
});

/* ------------------ CUSTOM MIDDLEWARE 1 ------------------ */
function middleware1(req, res, next) {
    console.log("Middleware 1 executed");
    req.customMessage = "Hello from Middleware 1";
    next();
}

/* ------------------ CUSTOM MIDDLEWARE 2 ------------------ */
function middleware2(req, res, next) {
    console.log("Middleware 2 executed");
    next();
}

/* ------------------ ROUTES ------------------ */

// Home route
app.get('/', (req, res) => {
    res.send("Home Page - Middleware Demo 🚀");
});

// Route with middleware chaining
app.get('/chain', middleware1, middleware2, (req, res) => {
    res.json({
        message: "Chained middleware executed successfully",
        data: req.customMessage
    });
});

// Route-level middleware
app.get('/secure', (req, res, next) => {
    console.log("Route-level middleware executed");
    next();
}, (req, res) => {
    res.send("Secure route accessed");
});

// POST route to show preprocessing
app.post('/data', (req, res) => {
    console.log("Request Body:", req.body);
    res.json({
        message: "Data received successfully",
        body: req.body
    });
});

/* ------------------ START SERVER ------------------ */
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});