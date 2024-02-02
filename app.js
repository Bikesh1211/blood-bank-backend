const http = require("http");
const PORT = 2003;
const fs = require("fs");
const path = require("path");
const userService = require("./src/services/user.service");
const { getUsers } = require("./src/controller/users");

const onRequest = async (req, res) => {
  const { method, url } = req;
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Range, Content-Disposition, Content-Description"
    );
    res.end();
  } else if (method === "GET" && url === "/") {
    res.setHeader("Content-Type", "text/html");
    const filePath = path.join(__dirname, "./public/template/index.html");
    try {
      const htmlContent = fs.readFileSync(filePath, "utf8");
      res.writeHead(200);
      res.end(htmlContent);
    } catch (error) {
      console.error("Error reading HTML file:", error);
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  } else if (method === "GET" && url === "/users") {
    await getUsers(req, res);
  } else if (req.method === "POST" && req.url === "/login") {
    console.log("bikesh is inside post login");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const postData = JSON.parse(body);

        res.writeHead(200, { "Content-Type": "application/json" });
        const data = await userService.loginUser(postData);
        res.end(JSON.stringify({ data }));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON data" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};

const serverRunning = () => {
  console.log("server listening on port" + PORT);
};

http.createServer(onRequest).listen(PORT, serverRunning);
