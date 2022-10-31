"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clients.init(
    {
      no: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      client: DataTypes.STRING,
      accessNo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Clients",
    }
  );
  return Clients;
};
