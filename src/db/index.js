const myMongoose = require("../module/mongodb/mongodb");

const connectDB = () => {
  const url =
    "mongodb+srv://virtuosway:virtuosway@cluster0.djgli9c.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "yourDatabaseName";
  myMongoose.connect(url, dbName);
};
module.exports = { connectDB };
