const { User } = require("../model/user");
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
  // const parseData = {
  //   username: "Bikesh is Good",
  //   email: "don@gmail.com",
  //   password: "bdon",
  // };
  try {
    const data = await User.create(parseData);
    res.send({ message: "success", data });
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
  const parseData = convertToJSON(req.body);
  const { id, ...rest } = parseData;
  try {
    const data = await User.updateById(id, rest);
    res.send({ message: "success", data });
  } catch (error) {}
};
const deleteUser = async (req, res) => {
  const parseData = convertToJSON(req.body);
  const { id } = parseData;
  const data = await User.deleteById(id);
  res.send({ data, message: "success" });
};
module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
