const myOrm = require("../module/mySQL/myOrm");

const User = myOrm("users");
const Donner = myOrm("users");
const NewsFeed = myOrm("feeds");
module.exports = { Donner, User, NewsFeed };
