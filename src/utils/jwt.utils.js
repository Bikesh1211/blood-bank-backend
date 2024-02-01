const jwt = require("jsonwebtoken");
const secretKey = "tutor-finder";
const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    return { error: error.message };
  }
};
module.exports = { createToken, verifyToken };
