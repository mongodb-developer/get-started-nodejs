const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name
const dbName = 'getstarted';
const collName = 'nodejs';
// Use connect method to connect to the Server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  const collection = db.collection(collName);
  // Drop
  db.collection('nodejs').drop({}, function(err, r){
    console.log("Dropped 'nodejs' collection");
  });

  let document = {"name": "MongoDB", 
                  "modified": new Date(), 
                  "count": 1, 
                  "info": {"x": 203, "y": 102}
                 };
  
  // Insert a single document
  collection.insertOne(document, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    console.log("Inserted: " + r.insertedCount);
  });

  // Insert multiple documents
  collection.insertMany([{"info":{"x":2}}, 
                         {"info":{"x":3}}], function(err, r) {
    assert.equal(null, err);
    assert.equal(2, r.insertedCount);
    console.log("Inserted: " + r.insertedCount);
  });

  // Print out inserted docs (findOne)
  collection.findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Find all
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
 
  // Sorting
  collection.find({}).sort({"info.x":1}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Projection
  collection.find({}).project({'_id':0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  collection.updateOne({ "info.x" : 2 }, { "$set": { "info.y" : 3 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the info.x field equal to 2");
  });  

  // Remove a document
  collection.deleteOne({ "info.x" : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the info.x field equal to 3");
  });    

  // Aggregation
  collection.aggregate([{'$group': {'_id': null, 'total': {'$sum': '$info.x'}}}],
    function(err, cursor) {
       assert.equal(err, null);
       cursor.toArray(function(err, doc){
           console.log(doc); 
       });
    });
  client.close();
});