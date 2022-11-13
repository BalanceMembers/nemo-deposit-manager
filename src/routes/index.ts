import express from "express";
const indexRouter = express.Router();

import usersRouter from "./users";
import balanceRouter from "./balances";
import clientsRouter from "./clients";

indexRouter.get("/", function (req, res, next) {
  res.send("API로 연결됩니다.");
});

indexRouter.use("/balances", balanceRouter);
indexRouter.use("/users", usersRouter);
indexRouter.use("/clients", clientsRouter);

export default indexRouter;
