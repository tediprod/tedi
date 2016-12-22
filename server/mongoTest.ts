var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  var url = 'mongodb://localhost:27017/tedi';

// Use connect method to connect to the server
MongoClient.connect(url, function(err: Error, db: any) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});