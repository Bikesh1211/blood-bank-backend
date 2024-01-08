const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/users");

const userRoute = (app) => {
  app.get("/", getUsers);
  app.post("/", addUser);
  app.put("/", updateUser);
  app.delete("/", deleteUser);
  app.post("/login", loginUser);
};

module.exports = userRoute;
