const express = require("express");
const router = express.Router();

const BalanceService = require("../services/balance.service");
const balanceService = new BalanceService();

router.get("/:clientId", balanceService.getBalancesOn);
router.post("/:clientId", balanceService.addBalanceOn);
router.put("/:balanceId", balanceService.updateBalance);
router.delete("/:balanceId", balanceService.deleteBalance);

module.exports = router;
