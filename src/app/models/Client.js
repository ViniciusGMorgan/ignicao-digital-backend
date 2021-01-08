import Sequelize, { Model } from "sequelize";
class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        tags: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
