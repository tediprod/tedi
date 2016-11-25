import fs = require('fs');
import http = require('http');
import events = require('events');

const hostname: string = "127.0.0.1";
const port: number = 8080;

const server: http.Server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    res.end("hello");
});

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}. CTRL+C to exit.`);
});

