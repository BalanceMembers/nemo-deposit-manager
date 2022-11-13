import express, { Request, Response, NextFunction } from "express";
const clientsRouter = express.Router();

const { Clients } = require("../models");

// 고객사 조회
clientsRouter.get("/", async (req, res) => {
  try {
    const data = await Clients.findAll({ order: [["clientId", "ASC"]] });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      success: false,
      errorMessage: "클라이언트 조회에 실패하였습니다.",
    });
  }
});

// 고객사 생성
clientsRouter.post("/", async (req, res) => {
  try {
    const { client, accessNo } = req.body;

    if (!client || !accessNo) {
      res
        .status(400)
        .json({ success: false, message: "누락된 항목이 있습니다." });
      return;
    }

    await Clients.create({ client, accessNo });
    res
      .status(201)
      .json({ success: true, message: "클라이언트가 생성되었습니다." });
  } catch (error: any) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      success: false,
      errorMessage: "클라이언트 생성에 실패하였습니다.",
    });
  }
});

// 고객사 수정
clientsRouter.put("/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const { client, accessNo } = req.body;
    const detailClient = await Clients.findOne({ where: { clientId } });

    if (!detailClient) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "해당 클라이언트가 없습니다." });
    }

    await Clients.update(
      { client: client, accessNo: accessNo },
      { where: { clientId } }
    );
    res
      .status(200)
      .json({ success: true, message: "클라이언트를 수정하였습니다." });
  } catch (error: any) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      success: false,
      errorMessage: "클라이언트 수정에 실패하였습니다.",
    });
  }
});

// 고객사 삭제
clientsRouter.delete("/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;
    const detailClient = await Clients.findOne({ where: { clientId } });

    if (!detailClient) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "해당 클라이언트가 없습니다." });
    }

    await Clients.destroy({ where: { clientId } });
    res
      .status(200)
      .json({ success: true, message: "클라이언트를 삭제하였습니다." });
  } catch (error: any) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).json({
      success: false,
      errorMessage: "클라이언트 삭제에 실패하였습니다.",
    });
  }
});

export default clientsRouter;
