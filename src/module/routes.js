const http = require("http");
const url = require("url");
const qs = require("querystring");
const auth = require("../middleware/auth.middleware");

function myRoutes() {
  const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };

  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );

    auth(req, res, () => {
      const method = req.method;
      const parsedUrl = url.parse(req.url, true);
      const path = parsedUrl.pathname;
      const routeHandler = routes[method][path] || notFound;

      // Parse request body for POST and PUT requests
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        req.body = qs.parse(body);

        // Extend res object to have a `send` method
        res.send = (data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        };

        routeHandler(req, res);
      });
    });
  });

  function notFound(req, res) {
    res.send({ error: "Not Found" });
  }

  function listen(port, callback) {
    server.listen(port, callback);
  }

  function get(path, handler) {
    routes["GET"][path] = handler;
  }

  function post(path, handler) {
    routes["POST"][path] = handler;
  }

  function put(path, handler) {
    routes["PUT"][path] = handler;
  }

  function del(path, handler) {
    routes["DELETE"][path] = handler;
  }

  return {
    get,
    post,
    put,
    delete: del,
    listen,
  };
}

module.exports = myRoutes;
