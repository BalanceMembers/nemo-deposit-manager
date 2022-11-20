"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      id: DataTypes.STRING,
      password: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isManager: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      telNum: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Users",
      tableName: "Users",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Users;
};
