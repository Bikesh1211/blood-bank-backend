const { verif, verifyToken } = require("../utils/jwt.utils");

const auth = (req, res, next) => {
  // const authToken = req.headers.authorization;
  // console.log(`${req.method} ${req.url}`);
  // if (req.url === "/login") {
  //   next();
  // } else {
  //   if (!authToken) {
  //     res.writeHead(401, { "Content-Type": "text/plain" });
  //     res.end("Unauthorized");
  //   } else {
  //     const token = authToken.split(" ")[1];
  //     const decoded = verifyToken(token);
  //     const role = decoded.role;
  //     if (role === "teacher" && req.method === "GET") {
  //       console.log("your teacher");
  //     }
  //     next();
  //   }
  // }
  next();
};

module.exports = auth;
