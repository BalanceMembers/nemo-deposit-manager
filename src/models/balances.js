"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Balances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Balances.init(
    {
      balanceId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      clientId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      content: DataTypes.STRING,
      whoInCharge: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Balances",
      tableName: "Balances",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Balances;
};
