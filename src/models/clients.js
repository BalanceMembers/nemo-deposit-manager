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
      clientId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      clientName: {
        type: DataTypes.STRING,
        unique: true,
      },
      managerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Clients",
      tableName: "Clients",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Clients;
};
