const { User } = require("../model/user");
const { createToken, verifyToken } = require("../utils/jwt.utils");

class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }
  async addUser(body) {
    const body1 = {
      email: "don@gmail.com",
      password: "bdon",
      fullName: "Bruce Wayne",
      Address: "Kalanki",
      role: "teacher",
      phone: "123123123",
    };
    try {
      const columns = [
        { name: "id", type: "INT AUTO_INCREMENT", primaryKey: true },
        { name: "fullName", type: "VARCHAR(50)", notNull: true },
        { name: "phone", type: "VARCHAR(50)", notNull: true },
        { name: "address", type: "VARCHAR(50)", notNull: true },
        { name: "gender", type: "VARCHAR(50)", notNull: true },
        { name: "email", type: "VARCHAR(100)", notNull: true },
        { name: "password", type: "VARCHAR(100)", notNull: true },
        { name: "role", type: "VARCHAR(50)", notNull: true },
        { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
      ];

      await this.UserModel.createTable(columns);
      // await this.UserModel.dropTable();

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
      try {
        const user = await this.UserModel.findOne({ email });
        if (!user) {
          throw { message: "User doesnt Exists" };
        }
        const token = createToken({
          email: user.email,
          username: user.username,
          role: user.role,
        });
        const de = verifyToken(token);
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
        return { success: false, error };
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      const data = await this.UserModel.deleteById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id, body) {
    try {
      return await this.UserModel.updateById(id, body);
    } catch (error) {
      throw error;
    }
  }
  async findTutor() {
    try {
      const user = await this.UserModel.find({ role: "teacher" });
      console.log("🚀 ~ UserService ~ findTutor ~ user:", user);
      return user;
    } catch (error) {
      return error;
    }
  }
}

const userService = new UserService(User);
module.exports = userService;
