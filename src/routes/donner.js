const {
  addDoner,
  deleteDoner,
  getDoner,
  updateDoner,
} = require("../controller/donner");

const donnerRoute = (app) => {
  app.get("/doner", getDoner);
  app.post("/doner", addDoner);
  app.put("/doner", updateDoner);
  app.delete("/doner", deleteDoner);
};

module.exports = donnerRoute;
