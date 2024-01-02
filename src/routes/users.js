const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

const userRoute = (app) => {
  app.get("/", getUsers);
  app.post("/", addUser);
  app.put("/", updateUser);
  app.delete("/", deleteUser);
};

module.exports = userRoute;
