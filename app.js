const http = require("http");
const PORT = 2003;
const fs = require("fs");
const path = require("path");
const userService = require("./src/services/user.service");
const { getUsers } = require("./src/controller/users");

const onRequest = async (req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/") {
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
  }

  if (method === "GET" && url === "/users") {
    // res.setHeader("Content-Type", "application/json");
    // const body = {
    //   email: "bikesh@gmail.com1",
    // };
    // try {
    //   const data = await userService.getUsers(body);
    //   res.writeHead(200);
    //   res.end(JSON.stringify(data));
    // } catch (error) {
    //   res.writeHead(500);
    //   res.end("Internal Server Error");
    // }
    await getUsers(req, res);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
const serverRunning = () => {
  console.log("server listening on port" + PORT);
};

http.createServer(onRequest).listen(PORT, serverRunning);
