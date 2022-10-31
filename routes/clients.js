const express = require("express");
const router = express.Router();
const { Clients } = require("../models");

// 모든 고객사 리스트 & 정보 보여주기
router.get("/", async (req, res) => {
  try {
    const clients = await Clients.findAll({ order: [["no", "ASC"]] });
    res.json({ clients });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "클라이언트 조회에 실패하였습니다.",
    });
  }
});

// 고객사 새로 생성
router.post("/", async (req, res) => {
  try {
    const { client, accessNo } = req.body;
    await Clients.create({ client, accessNo });

    if (!client || !accessNo) {
      res.status(400).json({ message: "누락된 항목이 있습니다." });
      return;
    }

    res.status(201).json({ success: true, message: "클라이언트가 생성되었습니다." });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "클라이언트 생성에 실패하였습니다.",
    });
  }
});

module.exports = router;
