const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "tutor",
});
database.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Yahoo! Connected to database.");

  // Close the database
  // database.end();
});

module.exports = { database };
