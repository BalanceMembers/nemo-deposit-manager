import Balances, { associate as associateBalances } from "./balances";
import Clients, { associate as associateClients } from "./clients";

export * from "./sequelize";

const db = {
  Balances,
  Clients,
};

export type dbType = typeof db;

associateBalances(db);
associateClients(db);
