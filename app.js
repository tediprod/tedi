var http = require('http');
var express = require('express');
var fs = require('fs');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end("Don't get lost in heaven.\n");
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081.\nCTRL+C to close connection.");

fs.readFile('input.txt', function (err, data) {
    if(err) return console.log(err.toString());
    if(data.toString()) return console.log(data.toString());
    console.log("Input.txt is empty.");
});

console.log("Program ended");