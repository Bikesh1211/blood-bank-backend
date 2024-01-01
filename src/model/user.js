const MONGOOSE = require("../module/myMongoose/CRUD");
const User = MONGOOSE("users");
module.exports = User;
