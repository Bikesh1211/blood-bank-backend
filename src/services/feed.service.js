const { NewsFeed } = require("../model/user");

class FeedServices {
  constructor(NewsFeedModel) {
    this.NewsFeedModel = NewsFeedModel;
  }
  async addFeed(body) {
    const body1 = {
      email: "don@gmail.com",
      password: "bdon",
      fullName: "Bruce Wayne",
      Address: "Kalanki",
      role: "teacher",
      phone: "123123123",
    };
    try {
      // const columns = [
      //   { name: "id", type: "INT AUTO_INCREMENT", primaryKey: true },
      //   { name: "subject", type: "VARCHAR(50)", notNull: true },
      //   { name: "class", type: "VARCHAR(50)", notNull: true },
      //   { name: "Medium", type: "VARCHAR(50)", notNull: true },
      //   { name: "salary", type: "VARCHAR(100)", notNull: true },
      //   { name: "Location", type: "VARCHAR(100)", notNull: true },
      //   { name: "Prefered University", type: "VARCHAR(50)", notNull: true },
      //   { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
      // ];

      const columns = [
        { name: "id", type: "INT AUTO_INCREMENT", primaryKey: true },
        { name: "subject", type: "VARCHAR(50)", notNull: true },
        { name: "class", type: "VARCHAR(50)", notNull: true },
        { name: "medium", type: "VARCHAR(50)", notNull: true },
        { name: "salary", type: "VARCHAR(100)", notNull: true },
        { name: "location", type: "VARCHAR(100)", notNull: true },
        { name: "prefered_university", type: "VARCHAR(50)", notNull: true },
        { name: "created_at", type: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP" },
      ];
      // await this.NewsFeedModel.createTable(columns);
      // await this.NewsFeedModel.dropTable();

      const user = await this.NewsFeedModel.create(body);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getFeeds(body) {
    try {
      return await this.NewsFeedModel.findAll();
    } catch (error) {
      return error;
    }
  }
}
const feedServices = new FeedServices(NewsFeed);
module.exports = feedServices;
