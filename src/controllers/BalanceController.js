const express = require("express");
const router = express.Router();
const { Balances, Clients } = require("../models");

class BalanceController {
  // 고객사 조회
  getBalance = async (req, res) => {
    try {
      const { clientId } = req.params;
      const data = await Balances.findAll({
        where: { clientId },
        order: [["balanceId", "ASC"]],
      });
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "적립금 내역 조회에 실패하였습니다.",
      });
    }
  };

  // 특정 클라이언트 적립금 내역 추가
  addBalance = async (req, res) => {
    try {
      const { clientId } = req.params;
      const { date, content, whoInCharge, amount } = req.body;

      const detailClient = await Clients.findOne({ where: { clientId } });

      if (!detailClient) {
        return res.status(404).json({
          success: false,
          errorMessage: "해당 클라이언트가 없습니다.",
        });
      }

      if (!date || !content || !whoInCharge || !amount) {
        res
          .status(400)
          .json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      await Balances.create({ clientId, date, content, whoInCharge, amount });
      res
        .status(201)
        .json({ success: true, message: "적립금 내역을 추가하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "적립금 내역 추가에 실패하였습니다.",
      });
    }
  };

  // 특정 ID의 적립금내역 수정
  updateBalance = async (req, res) => {
    try {
      const { balanceId } = req.params;
      const { date, content, whoInCharge, amount } = req.body;

      const selectBalance = await Balances.findOne({ where: { balanceId } });

      if (!selectBalance) {
        return res
          .status(404)
          .json({ success: false, errorMessage: "해당 내역이 없습니다." });
      }

      if (!date || !content || !whoInCharge || !amount) {
        res
          .status(400)
          .json({ success: false, message: "누락된 항목이 있습니다." });
        return;
      }

      await Balances.update(
        { date, content, whoInCharge, amount },
        { where: { balanceId } }
      );
      res
        .status(200)
        .json({ success: true, message: "적립금 내역을 수정하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "적립금 내역 수정에 실패하였습니다.",
      });
    }
  };

  // 특정 ID의 적립금내역 삭제
  deleteBalance = async (req, res) => {
    try {
      const { balanceId } = req.params;

      const selectBalance = await Balances.findOne({ where: { balanceId } });

      if (!selectBalance) {
        return res
          .status(404)
          .json({ success: false, errorMessage: "해당 내역이 없습니다." });
      }

      await Balances.destroy({ where: { balanceId } });
      res
        .status(200)
        .json({ success: true, message: "적립금 내역을 삭제하였습니다." });
    } catch (error) {
      console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      return res.status(400).json({
        success: false,
        errorMessage: "적립금 내역 삭제에 실패하였습니다.",
      });
    }
  };
}

module.exports = BalanceController;
