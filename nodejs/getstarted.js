const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { runInContext } = require('vm');

// Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useUnifiedTopology:true});

// Database Name
const dbName = 'getstarted';
const collName = 'nodejs';

async function run() {
  try {
    await client.connect(); 
    const db = client.db(dbName);
    const collection = db.collection(collName);
    console.log("Connected correctly to server");
    try {
      await collection.drop({}); 
      console.log(`Dropped ${collName} collection`); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }
    
    // Insert a single document
    let document = {"name": "MongoDB", 
                    "modified": new Date(), 
                    "count": 1, 
                    "info": {"x": 203, "y": 102}
                  };
    try {
      let result = await collection.insertOne(document); 
      console.log(`Inserted ${result.insertedCount} document`); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Insert multiple documents
    try {
      let result = await collection.insertMany([{"info":{"x":2}}, {"info":{"x":3}}]); 
      console.log(`Inserted ${result.insertedCount} documents`); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Print out inserted docs (findOne)
    try {
      let result = await collection.findOne({}); 
      console.log(result); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Find all
    try {
      let result = await collection.find({}).toArray(); 
      console.log(result); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Sorting
    try {
      let options = {"sort": {"info.x":1}};
      let result = await collection.find({}, options).toArray(); 
      console.log(result); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Projection
    try {
      let options = {"projection":{"_id":0, "info":1}}
      let result = await collection.find({}, options).toArray(); 
      console.log(result); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Update 
    try {
      let result = await collection.updateOne({ "info.x" : 2 }, { "$set": { "info.y" : 3 } }); 
      console.log(`Modified ${result.nModified} document`); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Remove a document 
    try {
      let result = await collection.deleteOne({ "info.x" : 3 }); 
      console.log(`Removed a document`); 
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

    // Aggregation 
    try {
      let cursor = collection.aggregate([{'$group': {'_id': null, 'total': {'$sum': '$info.x'}}}]); 
      await cursor.forEach(doc =>{
        console.log(doc);
      });
    } catch (err){
      console.error(`Encountered an error: ${err}`);
    }

  } finally {
    await client.close(); 
  }
}
run().catch(console.dir);