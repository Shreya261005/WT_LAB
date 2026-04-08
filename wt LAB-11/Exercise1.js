const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {

    console.log(`Request: ${req.method} ${req.url}`);

    // Set HTML header
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        res.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Home</title>
                <style>
                    body { font-family: Arial; text-align: center; }
                    h1 { color: blue; }
                </style>
            </head>
            <body>
                <h1>Welcome to My Node.js Server</h1>
                <p>This is the Home Page</p>
                <a href="/about">About</a> | 
                <a href="/contact">Contact</a>
            </body>
            </html>
        `);
    }
    else if (req.url === '/about') {
        res.write(`
            <html>
            <body>
                <h1>About Page</h1>
                <p>This server is built using Node.js without frameworks.</p>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);
    }
    else if (req.url === '/contact') {
        res.write(`
            <html>
            <body>
                <h1>Contact Page</h1>
                <p>Email: example@email.com</p>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);
    }
    else {
        res.statusCode = 404;
        res.write(`
            <html>
            <body>
                <h1>404 Not Found</h1>
                <a href="/">Go Home</a>
            </body>
            </html>
        `);
    }

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});