// const {
//   getUsers,
//   addUser,
//   updateUser,
//   deleteUser,
//   loginUser,
// } = require("../controller/users");

// const userRoute = (app) => {
//   app.get("/", getUsers);
//   app.post("/", addUser);
//   app.put("/", updateUser);
//   app.delete("/", deleteUser);
//   app.post("/login", loginUser);
// };

// module.exports = userRoute;
const fs = require("fs");

class RouteHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  async get(routes, handler) {
    if (this.req.method === "GET" && this.req.url === routes) {
      this.res.setHeader("Content-Type", "application/json");
      await handler(this.req, this.res);
    }
  }
  async post(routes, handler) {
    if (this.req.method === "POST" && this.req.url === routes) {
      this.res.setHeader("Content-Type", "application/json");
      await handler(this.req, this.res);
    }
  }
}
module.exports = RouteHandler;
