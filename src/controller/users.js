const User = require("../model/user");
const { convertToJSON } = require("../utils/jsonUtils");

const getUsers = async (req, res) => {
  try {
    res.send({ message: "Hello, World!" });
  } catch (error) {
    console.error("Error:", error);
  }
};
const addUser = async (req, res) => {
  const parseData = convertToJSON(req.body);
  await User.insertOne(parseData);
  res.send({ message: "Data received successfully", data: parseData });
};

const updateUser = async (req, res) => {
  // const itemId = req.params.id;
  const updatedData = convertToJSON(req.body);
  const { id, ...rest } = updatedData;
  // Perform update logic using itemId and updatedData
  const data = await User.updateOne({ _id: id }, rest);
  res.send({
    messag: `Data with ID updated successfully`,
    data,
  });
};
const deleteUser = async (req, res) => {
  const updatedData = convertToJSON(req.body);
  await User.deleteOne({ _id: updatedData.id });
  // Perform delete logic using itemId
  res.send({ message: `Data with ID ${updatedData.id} deleted successfully` });
};
module.exports = { getUsers, addUser, updateUser, deleteUser };
