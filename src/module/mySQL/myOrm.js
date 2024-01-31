const crudServices = require("./crud.service");
const myOrm = (tableName) => {
  return {
    create: (record) => crudServices.insertRecord(tableName, record),
    findAll: () => crudServices.findAll(tableName),
    findById: (id) => crudServices.findById(tableName, id),
    findOne: (details) => crudServices.findOneByDetails(tableName, details),
    deleteById: (id) => crudServices.deleteRecordById(tableName, id),
    updateById: (id, record) =>
      crudServices
        .updateRecordById(tableName, id, record)
        .then((record) => record)
        .catch((error) => error),
  };
};
module.exports = myOrm;
