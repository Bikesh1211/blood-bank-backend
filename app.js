const http = require("http");
const PORT = 2003;
const fs = require("fs");
const paths = require("path");
const userService = require("./src/services/user.service");
const { getUsers, registerUser, loginUser } = require("./src/controller/users");
const RouteHandler = require("./src/routes/users");
const url = require("url");
const qs = require("querystring");
const onRequest = async (req, res) => {
  const { method } = req;
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  req.on("end", async () => {
    req.body = qs.parse(body);
    switch (method) {
      case "OPTIONS":
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Content-Range, Content-Disposition, Content-Description"
        );
        res.end();
        break;

      case "GET":
        if (req.url === "/") {
          res.setHeader("Content-Type", "text/html");
          const filePath = paths.join(
            __dirname,
            "./public/template/index.html"
          );
          try {
            const htmlContent = fs.readFileSync(filePath, "utf8");
            res.writeHead(200);
            res.end(htmlContent);
          } catch (error) {
            console.error("Error reading HTML file:", error);
            res.writeHead(500);
            res.end("Internal Server Error");
          }
        }
        if (req.url === "/users") {
          res.writeHead(200, { "Content-Type": "application/json" });
          await getUsers(req, res);
        }
      case "POST":
        if (req.url === "/login") {
          res.writeHead(200, { "Content-Type": "application/json" });
          await loginUser(req, res);
        }
        if (req.url === "register") {
          res.writeHead(200, { "Content-Type": "application/json" });
          await registerUser(req, res);
        }
        break;
      case "DELETE":
        break;
      case "PUT":
        break;
      case "PATCH":
        break;
      default:
        break;
    }
    // if (method === "OPTIONS") {
    //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    //   res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "Content-Type, Content-Range, Content-Disposition, Content-Description"
    //   );
    //   res.end();
    // } else if (method === "GET" && req.url === "/") {
    //   res.setHeader("Content-Type", "text/html");
    //   const filePath = path.join(__dirname, "./public/template/index.html");
    //   try {
    //     const htmlContent = fs.readFileSync(filePath, "utf8");
    //     res.writeHead(200);
    //     res.end(htmlContent);
    //   } catch (error) {
    //     console.error("Error reading HTML file:", error);
    //     res.writeHead(500);
    //     res.end("Internal Server Error");
    //   }
    // } else if (method === "GET" && req.url === "/users") {
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   await getUsers(req, res);
    // } else if (method === "POST" && req.url === "/login") {
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   await loginUser(req, res);
    // } else if (method === "POST" && req.url === "/register") {
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   await registerUser(req, res);
    // } else {
    //   res.writeHead(404);
    //   res.end(JSON.stringify({ error: "Not Found" }));
    // }
  });
};

const serverRunning = () => {
  console.log("server listening on port" + PORT);
};

http.createServer(onRequest).listen(PORT, serverRunning);
