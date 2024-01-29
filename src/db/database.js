const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql1231",
  database: "tutor",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Yahoo! Database Connected!");
});

module.export = { database };
