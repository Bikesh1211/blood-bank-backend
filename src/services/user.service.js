const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const { updateRecordById } = require("../module/mySQL/crud.service");

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }
  async addUser(body) {
    // const body = {
    //   username: "Bikesh is Good",
    //   email: "don@gmail.com",
    //   password: "bdon",
    // };

    try {
      const user = await this.UserModel.create(body);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUsers(body) {
    try {
      return await this.UserModel.findAll();
      //   return await this.UserModel.findOne(body);
      return await this.UserModel.findById(49);
    } catch (error) {
      return error;
    }
  }
  async loginUser(body) {
    try {
      const { email, password } = body;
      const createToken = (user) => {
        return jwt.sign(user, "helloWorld", {
          expiresIn: "7d",
        });
      };
      try {
        const user = await this.UserModel.findOne({ email });
        if (!user) {
          return { message: "User doesnt Exists" };
        }
        const token = createToken({
          user: user.email,
          fullName: user.fullName,
        });
        if (user.password === password) {
          return {
            ...user,
            token,
            success: true,
          };
        } else {
          return { message: "invalid credentials", success: false };
        }
      } catch (error) {
        return error;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      const data = await this.UserModel.deleteById(53);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id, body) {
    try {
      return await this.UserModel.deleteById(id, body);
      return await updateRecordById("users", id, body);
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService(User);
module.exports = userService;
