const { connectDB } = require("./src/db");
const User = require("./src/model/user");
const myExpress = require("./src/module/myExpress");
const app = myExpress();

app.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.send({ message: "Hello, World!", data });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/", async (req, res) => {
  const data = await User.insertOne(req.body);
  console.log(req.body);
  res.send({ message: "Data received successfully" });
});

app.put("/", async (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;
  console.log({ itemId, updatedData });
  // Perform update logic using itemId and updatedData
  const data = await User.updateOne({ _id: itemId }, updatedData);
  res.send({
    message: `Data with ID ${itemId} updated successfully`,
    data,
  });
});

app.delete("/api/data/:id", (req, res) => {
  const itemId = req.params.id;
  // Perform delete logic using itemId
  res.send({ message: `Data with ID ${itemId} deleted successfully` });
});

const PORT = 2003;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
