"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Balances, Clients } = require("../models");
const express_1 = __importDefault(require("express"));
const balancesRouter = express_1.default.Router();
// 특정 클라이언트 적립금 내역 보기
balancesRouter.get("/:clientId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const data = yield Balances.findAll({
            where: { clientId },
            order: [["balanceId", "ASC"]],
        });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "적립금 내역 조회에 실패하였습니다.",
        });
    }
}));
// 특정 클라이언트 적립금 내역 추가
balancesRouter.post("/:clientId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const { date, content, in_charge, amount } = req.body;
        const detailClient = yield Clients.findOne({ where: { clientId } });
        if (!detailClient) {
            return res
                .status(404)
                .json({ success: false, errorMessage: "해당 클라이언트가 없습니다." });
        }
        if (!date || !content || !in_charge || !amount) {
            res
                .status(400)
                .json({ success: false, message: "누락된 항목이 있습니다." });
            return;
        }
        yield Balances.create({ clientId, date, content, in_charge, amount });
        res
            .status(201)
            .json({ success: true, message: "적립금 내역을 추가하였습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "적립금 내역 추가에 실패하였습니다.",
        });
    }
}));
// 특정 ID의 적립금내역 수정
balancesRouter.put("/:balanceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { balanceId } = req.params;
        const { date, content, in_charge, amount } = req.body;
        const selectBalance = yield Balances.findOne({ where: { balanceId } });
        if (!selectBalance) {
            return res
                .status(404)
                .json({ success: false, errorMessage: "해당 내역이 없습니다." });
        }
        if (!date || !content || !in_charge || !amount) {
            res
                .status(400)
                .json({ success: false, message: "누락된 항목이 있습니다." });
            return;
        }
        yield Balances.update({ date: date, content: content, in_charge: in_charge, amount: amount }, { where: { balanceId } });
        res
            .status(200)
            .json({ success: true, message: "적립금 내역을 수정하였습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "적립금 내역 수정에 실패하였습니다.",
        });
    }
}));
// 특정 ID의 적립금내역 삭제
balancesRouter.delete("/:balanceId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { balanceId } = req.params;
        const selectBalance = yield Balances.findOne({ where: { balanceId } });
        if (!selectBalance) {
            return res
                .status(404)
                .json({ success: false, errorMessage: "해당 내역이 없습니다." });
        }
        yield Balances.destroy({ where: { balanceId } });
        res
            .status(200)
            .json({ success: true, message: "적립금 내역을 삭제하였습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "적립금 내역 삭제에 실패하였습니다.",
        });
    }
}));
exports.default = balancesRouter;
