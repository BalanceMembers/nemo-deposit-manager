import { Sequelize } from "sequelize";
const config = require("../../sequelize/config/config.js");

const env =
  (process.env.NODE_ENV as "production" | "test" | "development") ||
  "development";

const { database, username, password } = config[env];
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
