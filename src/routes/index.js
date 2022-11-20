const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const balanceRouter = require("./balances");
const clientsRouter = require("./clients");

router.get("/", function (req, res, next) {
  res.send("API로 연결됩니다.");
});

router.use("/balances", balanceRouter);
router.use("/users", usersRouter);
router.use("/clients", clientsRouter);

module.exports = router;
