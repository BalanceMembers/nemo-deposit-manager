const express = require("express");
const router = express.Router();
const { Clients } = require("../models");

router.get("/", async (req, res) => {
  try {
    const clients = await Clients.findAll({ order: [["no", "ASC"]] });
    res.json({ clients });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      errorMessage: "게시글 조회에 실패하였습니다.",
    });
  }
});

module.exports = router;
