const express = require("express");
const router = express.Router();

const BalanceController = require("../controllers/BalanceController");
const balanceController = new BalanceController();

router.get("/:clientId", balanceController.getBalance); // 특정 클라이언트 적립금 내역 보기
router.post("/:clientId", balanceController.addBalance); // 특정 클라이언트 적립금 내역 추가
router.put("/:balanceId", balanceController.updateBalance); // 특정 ID의 적립금내역 수정
router.delete("/:balanceId", balanceController.deleteBalance); // 특정 ID의 적립금내역 삭제

module.exports = router;
