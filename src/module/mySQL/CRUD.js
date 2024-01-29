const { database } = require("../../db/database");

const insertRecord = async (tableName, record) => {
  const query = `INSERT INTO ${tableName} SET ?`;
  try {
    const results = await new Promise((resolve, reject) => {
      database.query(query, record, (error, results, fields) => {
        if (error) {
          reject(`Error inserting record: ${error.message}`);
        } else {
          console.log({ results });
          resolve(results);
        }
      });
    });

    return `Record inserted successfully. ID: ${results.insertId}`;
  } catch (error) {
    throw error;
  }
};

const deleteRecordById = async (tableName, id) => {
  try {
    const recordToDelete = await findById(tableName, id);
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    await new Promise((resolve, reject) => {
      database.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
    return recordToDelete;
  } catch (error) {
    throw error;
  }
};

function findAll(tableName) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
    database.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const findById = async (tableName, id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    database.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          resolve("No record found");
        } else {
          resolve(result[0]);
        }
      }
    });
  });
};

const updateRecordById = async (tableName, id, newData) => {
  try {
    const recordToDelete = await findById(tableName, id);

    const setValues = Object.keys(newData)
      .map((key) => `${key} = ?`)
      .join(", ");

    const query = `UPDATE ${tableName} SET ${setValues} WHERE id = ?`;
    const values = [...Object.values(newData), id];

    const result = await new Promise((resolve, reject) => {
      database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.affectedRows);
      });
    });

    return recordToDelete;
  } catch (error) {
    throw error;
  }
};

const createTable = (tableName, columns) => {
  const columnDefinitions = columns
    .map((column) => {
      return `${column.name} ${column.type}${
        column.primaryKey ? " PRIMARY KEY" : ""
      }${column.notNull ? " NOT NULL" : ""}`;
    })
    .join(", ");

  database.query(`SHOW TABLES LIKE '${tableName}'`, (error, results) => {
    if (error) {
      console.error("Error checking table existence: " + error.message);
      return;
    }

    if (results.length > 0) {
      console.log(`Table '${tableName}' already exists.`);
      return;
    } else {
      const query = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columnDefinitions});`;
      database.query(query, (error, results, fields) => {
        if (error) {
          console.error("Error creating table: " + error.message);
        } else {
          console.log("Table created successfully.");
        }
      });
    }
  });
};

// const columns = [
//   { name: "id", type: "INT AUTO_INCREMENT", primaryKey: true },
//   { name: "username", type: "VARCHAR(50)", notNull: true },
//   { name: "email", type: "VARCHAR(100)", notNull: true },
//   { name: "password", type: "VARCHAR(100)", notNull: true },
//   { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
// ];

module.exports = {
  insertRecord,
  deleteRecordById,
  findAll,
  findById,
  updateRecordById,
  createTable,
};
