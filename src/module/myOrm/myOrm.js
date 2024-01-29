const {
  insertRecord,
  findById,
  findAll,
  deleteRecordById,
  updateRecordById,
} = require("../mongodb/CRUD");
const myOrm = (tableName) => {
  return {
    insertOne: (record) => insertRecord(tableName, record),
    findById: (id) =>
      findById(tableName, id)
        .then((record) => record)
        .catch((error) => error),
    findAll: () =>
      findAll(tableName)
        .then((records) => records)
        .catch((error) => error),
    deleteById: (id) =>
      deleteRecordById(tableName, id)
        .then((record) => record)
        .catch((error) => error),
    updateById: (id, record) =>
      updateRecordById(tableName, id, record)
        .then((record) => record)
        .then((record) => record),
  };
};
module.exports = myOrm;
