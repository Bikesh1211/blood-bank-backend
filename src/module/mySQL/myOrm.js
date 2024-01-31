const {
  insertRecord,
  findById,
  findAll,
  deleteRecordById,
  updateRecordById,
  findOneByDetails,
} = require("./crud-operation");
const myOrm = (tableName) => {
  return {
    create: (record) => insertRecord(tableName, record),
    findAll: () => findAll(tableName),
    findById: (id) => findById(tableName, id),
    findOne: (details) => findOneByDetails(tableName, details),
    deleteById: (id) => deleteRecordById(tableName, id),
    updateById: (id, record) => updateRecordById(tableName, id, record),
  };
};
module.exports = myOrm;
