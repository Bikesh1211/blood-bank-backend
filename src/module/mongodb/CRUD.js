const { database } = require("../../db/database");

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

module.exports = {
  insertRecord,
  deleteRecordById,
  findAll,
  findById,
  updateRecordById,
};
