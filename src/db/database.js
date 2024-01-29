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

  // Execute SQL query
  // database.query(
  //   "CREATE TABLE IF NOT EXISTS `users` ( \
  //   `id` INT AUTO_INCREMENT PRIMARY KEY, \
  //   `username` VARCHAR(50) NOT NULL, \
  //   `email` VARCHAR(100) NOT NULL, \
  //   `password` VARCHAR(100) NOT NULL, \
  //   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
  // );",
  //   (error, results, fields) => {
  //     if (error) {
  //       console.error("Error creating table: " + error.message);
  //     } else {
  //       console.log("Table created successfully.");
  //     }
  //   }
  // );

  // Close the database
  // database.end();
});
// Function to insert a record into the database
const insertRecord = async (tableName, record) => {
  const query = `INSERT INTO ${tableName} SET ?`;

  try {
    const results = await new Promise((resolve, reject) => {
      database.query(query, record, (error, results, fields) => {
        if (error) {
          reject(`Error inserting record: ${error.message}`);
        } else {
          resolve(results);
        }
      });
    });

    return `Record inserted successfully. ID: ${results.insertId}`;
  } catch (error) {
    throw error;
  }
};

module.exports = { database, insertRecord };
