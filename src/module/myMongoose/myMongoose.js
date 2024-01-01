const { MongoClient, ObjectId } = require("mongodb");

let db;

async function connect(url, dbName) {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to the database");
    db = client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
}

async function disconnect() {
  try {
    await db.client.close();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error while disconnecting from the database", error);
    throw error;
  }
}

async function insertOne(collectionName, document) {
  return db.collection(collectionName).insertOne(document);
}

async function findOne(collectionName, filter) {
  return db.collection(collectionName).findOne(filter);
}

async function find(collectionName, filter = {}) {
  return db.collection(collectionName).find(filter).toArray();
}

async function updateOne(collectionName, filter, update) {
  return db.collection(collectionName).updateOne(filter, update);
}

async function deleteOne(collectionName, filter) {
  return db.collection(collectionName).deleteOne(filter);
}

function getObjectID(id) {
  return new ObjectId(id);
}
// !------------

// !------------
module.exports = {
  connect,
  disconnect,
  insertOne,
  updateOne,
  deleteOne,
  findOne,
  find,
  getObjectID,
};
