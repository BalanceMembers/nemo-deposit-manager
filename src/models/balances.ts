import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class Balances extends Model {
  public balanceId!: number;
  public clientId!: number;
  public date!: string;
  public content!: string;
  public whoInCharge!: string;
  public amount!: number;
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
    modelName: "Balances",
    tableName: "Balances",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {};

export default Balances;
