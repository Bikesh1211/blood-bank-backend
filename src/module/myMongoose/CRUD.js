const myMongoose = require("../myMongoose/myMongoose");
const MONGOOSE = (collectionName) => {
  return {
    insertOne: (document) => myMongoose.insertOne(collectionName, document),
    findOne: (filter) => myMongoose.find(collectionName, filter),
    find: () => myMongoose.find(collectionName),
    updateOne: (filter, document) =>
      myMongoose.updateOne(collectionName, filter, document),
    deleteOne: (document) => myMongoose.deleteOne(collectionName, document),
  };
};
module.exports = MONGOOSE;
