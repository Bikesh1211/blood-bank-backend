// const MONGOOSE = require("../module/mongodb/CRUD");
// const User = MONGOOSE("users");
// const Donner = MONGOOSE("doners");
// module.exports = { Donner, User };

const myOrm = require("../module/myOrm/myOrm");

const User = myOrm("users");
const Donner = myOrm("users");
module.exports = { Donner, User };
