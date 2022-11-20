const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/ClientController");
const clientController = new ClientController();

router.get("/", clientController.getClient); // 고객사 조회
router.post("/", clientController.createClient); // 고객사 생성
router.put("/:clientId", clientController.updateClient); // 고객사 수정
router.delete("/:clientId", clientController.removeClient); // 고객사 삭제

module.exports = router;
