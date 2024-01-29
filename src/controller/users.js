const { User } = require("../model/user");
const { findAll } = require("../module/mongodb/CRUD");
const { convertToJSON } = require("../utils/jsonUtils");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    // const data = await User.findById(44);
    const data = await User.findAll();
    res.send({ data });
  } catch (error) {
    console.error("Error:", error);
  }
};
const addUser = async (req, res) => {
  const parseData = convertToJSON(req.body);
  // const { email, password, fullName } = parseData;
  // const user = await User.findOne({ email });
  // if (user) {
  //   return res.send({ message: "User Already Exists" });
  // }
  // await User.insertOne({ email, password, fullName });
  // res.send({ message: "Data received successfully", data: parseData });
  // const record = {
  //   username: "john_doe",
  //   email: "john@example.com",
  //   password: "password123",
  // };

  try {
    // insertRecord("users", parseData);
    await User.insertOne(parseData);
    res.send({ message: "success" });
  } catch (error) {
    res.send({ error });
  }
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
  const record = {
    username: "Bikesh is Good",
    email: "john@example.com",
  };
  try {
    const data = await User.updateById(34, record);
    res.send({ message: "success", data });
  } catch (error) {}
};
const deleteUser = async (req, res) => {
  const data = await User.deleteById(33);
  res.send({ data, message: "success" });
};
module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
