const myOrm = require("../module/mySQL/myOrm");

const User = myOrm("users");
const Donner = myOrm("users");
module.exports = { Donner, User };
