const MONGOOSE = require("../module/myMongoose/CRUD");
const User = MONGOOSE("users");
const Donner = MONGOOSE("doners");
module.exports = { Donner, User };
