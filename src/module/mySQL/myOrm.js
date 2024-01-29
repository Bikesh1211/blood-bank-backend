const {
  insertRecord,
  findById,
  findAll,
  deleteRecordById,
  updateRecordById,
} = require("./CRUD");
const myOrm = (tableName) => {
  return {
    create: (record) =>
      insertRecord(tableName, record)
        .then((record) => record)
        .catch((err) => err),
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
