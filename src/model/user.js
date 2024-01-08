const MONGOOSE = require("../module/mongodb/CRUD");
const User = MONGOOSE("users");
const Donner = MONGOOSE("doners");
module.exports = { Donner, User };
