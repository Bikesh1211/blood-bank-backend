const { User } = require("../model/user");
const { convertToJSON } = require("../utils/jsonUtils");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    res.send({ message: "Hello, World!" });
  } catch (error) {
    console.error("Error:", error);
  }
};
const addUser = async (req, res) => {
  const parseData = convertToJSON(req.body);
  const { email, password, fullName } = parseData;
  const user = await User.findOne({ email });
  if (user) {
    return res.send({ message: "User Already Exists" });
  }
  await User.insertOne({ email, password, fullName });
  res.send({ message: "Data received successfully", data: parseData });
};

const loginUser = async (req, res) => {
  const parseData = convertToJSON(req.body);
  const { email, password } = parseData;

  const createToken = (user) => {
    return jwt.sign(user, "helloWorld", {
      expiresIn: "7d",
    });
  };
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "User doesnt Exists" });
    }
    const token = createToken({ user: user.email, fullName: user.fullName });
    if (user.password === password) {
      return res.send({
        ...user,
        token,
        success: true,
      });
    } else {
      res.send({ message: "invalid credentials", success: false });
    }
  } catch (error) {
    res.send({ error });
  }
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
module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
