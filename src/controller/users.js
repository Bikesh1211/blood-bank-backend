const userService = require("../services/user.service");
const { convertToJSON } = require("../utils/jsonUtils");
const getUsers = async (req, res) => {
  const body = {
    email: "bikesh@gmail.com1",
  };
  try {
    const data = await userService.getUsers(body);
    res.end(JSON.stringify(data));
  } catch (error) {
    res.end("Internal Server Error");
  }
};
const addUser = async (req, res) => {
  const body = convertToJSON(req.body);
  try {
    const user = await userService.addUser(body);
    res.send({ message: "success", user });
  } catch (error) {
    res.send({ error: "Error adding user", error });
  }
};

const registerUser = async (req, res) => {
  try {
    const body = convertToJSON(req.body);
    const data = await userService.addUser(body);
    res.end(JSON.stringify({ data }));
  } catch (error) {
    res.end(JSON.stringify({ error: "Invalid JSON data" }));
  }
};

const loginUser = async (req, res) => {
  try {
    const postData = convertToJSON(req.body);
    const data = await userService.loginUser(postData);
    res.end(JSON.stringify({ data }));
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.end(JSON.stringify({ error: "Invalid JSON data" }));
  }
};

const updateUser = async (req, res) => {
  const { id, ...rest } = convertToJSON(req.body);
  try {
    const data = await userService.updateUser(id, rest);
    res.send({ message: "success", data });
  } catch (error) {
    res.send({ message: "Error updating user", error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = convertToJSON(req.body);
  try {
    const data = await userService.deleteUser(id);
    res.send({ message: "success", data });
  } catch (error) {
    res.send({ message: "error", error });
  }
};

const getTutor = async (req, res) => {
  try {
    const data = await userService.findTutor();
    res.end(JSON.stringify(data));
  } catch (error) {}
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  getTutor,
};
