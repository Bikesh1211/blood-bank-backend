const http = require("http");
const url = require("url");
const querystring = require("querystring");

// Dummy data for demonstration purposes
let data = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  const query = querystring.parse(parsedUrl.query);

  // Set response headers
  res.setHeader("Content-Type", "application/json");

  // Handle routes
  if (path === "/api/items" && req.method === "GET") {
    // Get all items
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } else if (path === "/api/items" && req.method === "POST") {
    // Add a new item
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newItem = JSON.parse(body);
      data.push(newItem);
      res.statusCode = 201;
      res.end(JSON.stringify(newItem));
    });
  } else {
    // Handle other routes
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = 2003;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
