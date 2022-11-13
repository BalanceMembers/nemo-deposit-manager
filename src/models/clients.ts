import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class Clients extends Model {
  public clientId!: number;
  public client!: string;
  public accessNo!: number;
}

Clients.init(
  {
    clientId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    client: DataTypes.STRING,
    accessNo: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Clients",
    tableName: "Clients",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {};

export default Clients;
