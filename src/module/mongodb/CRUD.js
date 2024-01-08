const myMongoose = require("./mongodb");
const MONGOOSE = (collectionName) => {
  return {
    insertOne: (document) => myMongoose.insertOne(collectionName, document),
    findOne: (filter) => myMongoose.findOne(collectionName, filter),
    find: () => myMongoose.find(collectionName),
    updateOne: (filter, document) =>
      myMongoose.updateOne(collectionName, filter, document),
    deleteOne: (filter) => myMongoose.deleteOne(collectionName, filter),
  };
};
module.exports = MONGOOSE;