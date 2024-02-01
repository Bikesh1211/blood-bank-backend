const { database } = require("../../db/database");
class crudOperation {
  constructor(database) {
    this.database = database;
  }

  async insertRecord(tableName, record) {
    const query = `INSERT INTO ${tableName} SET ?`;
    try {
      const results = await new Promise((resolve, reject) => {
        this.database.query(query, record, (error, results, fields) => {
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
  }

  deleteRecordById = async (tableName, id) => {
    try {
      const recordToDelete = await this.findById(tableName, id);
      const query = `DELETE FROM ${tableName} WHERE id = ?`;
      await new Promise((resolve, reject) => {
        this.database.query(query, [id], (error, results) => {
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

  findAll(tableName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName}`;
      this.database.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  findById = async (tableName, id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName} WHERE id = ?`;
      this.database.query(query, [id], (err, result) => {
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
  updateRecordById = async (tableName, id, newData) => {
    try {
      console.log("updating record");
      const recordToDelete = await this.findById(tableName, id);

      const setValues = Object.keys(newData)
        .map((key) => `${key} = ?`)
        .join(", ");

      const query = `UPDATE ${tableName} SET ${setValues} WHERE id = ?`;
      const values = [...Object.values(newData), id];

      const result = await new Promise((resolve, reject) => {
        this.database.query(query, values, (error, results) => {
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

  createTable = (tableName, columns) => {
    // const columns = [
    //   { name: "id", type: "INT AUTO_INCREMENT", primaryKey: true },
    //   { name: "username", type: "VARCHAR(50)", notNull: true },
    //   { name: "email", type: "VARCHAR(100)", notNull: true },
    //   { name: "password", type: "VARCHAR(100)", notNull: true },
    //   { name: "role", type: "VARCHAR(50)", notNull: true },
    //   { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
    // ];

    const columnDefinitions = columns
      .map((column) => {
        return `${column.name} ${column.type}${
          column.primaryKey ? " PRIMARY KEY" : ""
        }${column.notNull ? " NOT NULL" : ""}`;
      })
      .join(", ");

    this.database.query(`SHOW TABLES LIKE '${tableName}'`, (error, results) => {
      if (error) {
        console.error("Error checking table existence: " + error.message);
        return "Error checking table existence: " + error.message;
      }

      if (results.length > 0) {
        console.log(`Table '${tableName}' already exists.`);
        return `Table '${tableName}' already exists.`;
      } else {
        const query = `CREATE TABLE IF NOT EXISTS \`${tableName}\` (${columnDefinitions});`;
        this.database.query(query, (error, results, fields) => {
          if (error) {
            return "Error creating table: " + error.message;
          } else {
            return "Table created successfully.";
          }
        });
      }
    });
  };

  findOneByDetails = (tableName, details) => {
    return new Promise((resolve, reject) => {
      const whereClause = Object.keys(details)
        .map((key) => `${key} = ?`)
        .join(" AND ");

      const query = `SELECT * FROM ${tableName} WHERE ${whereClause}`;

      const values = Object.values(details);

      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  };
  dropTable = (tableName) => {
    try {
      this.database.query(`DROP TABLE ${tableName}`, (error, result) => {
        console.log({ error, result });
      });
    } catch (error) {}
  };
}
const crudServices = new crudOperation(database);
module.exports = crudServices;
