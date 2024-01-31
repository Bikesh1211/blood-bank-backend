const userService = require("../services/user.service");
const { convertToJSON } = require("../utils/jsonUtils");
const getUsers = async (req, res) => {
  try {
    const body = {
      email: "bikesh@gmail.com",
    };
    const data = await userService.getUsers(body);
    res.send({ data });
  } catch (error) {
    console.error("Error:", error);
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

const loginUser = async (req, res) => {
  const body = convertToJSON(req.body);
  try {
    const user = await userService.loginUser(body);
    res.send({ message: "success", user });
  } catch (error) {
    res.send({ error: "Error adding user" });
  }
};

const updateUser = async (req, res) => {
  const { id, ...rest } = convertToJSON(req.body);
  console.log({ rest, id });
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
module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
