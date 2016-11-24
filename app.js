var http = require('http');
var express = require('express');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type' : 'text/plain'});

    response.end("Don't get lost in heaven.\n");
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081.\nCTRL+C to close connection.");