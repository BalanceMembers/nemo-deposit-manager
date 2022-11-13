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
const express_1 = __importDefault(require("express"));
const clientsRouter = express_1.default.Router();
const { Clients } = require("../models");
// 고객사 조회
clientsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Clients.findAll({ order: [["clientId", "ASC"]] });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "클라이언트 조회에 실패하였습니다.",
        });
    }
}));
// 고객사 생성
clientsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client, accessNo } = req.body;
        if (!client || !accessNo) {
            res
                .status(400)
                .json({ success: false, message: "누락된 항목이 있습니다." });
            return;
        }
        yield Clients.create({ client, accessNo });
        res
            .status(201)
            .json({ success: true, message: "클라이언트가 생성되었습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "클라이언트 생성에 실패하였습니다.",
        });
    }
}));
// 고객사 수정
clientsRouter.put("/:clientId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const { client, accessNo } = req.body;
        const detailClient = yield Clients.findOne({ where: { clientId } });
        if (!detailClient) {
            return res
                .status(404)
                .json({ success: false, errorMessage: "해당 클라이언트가 없습니다." });
        }
        yield Clients.update({ client: client, accessNo: accessNo }, { where: { clientId } });
        res
            .status(200)
            .json({ success: true, message: "클라이언트를 수정하였습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "클라이언트 수정에 실패하였습니다.",
        });
    }
}));
// 고객사 삭제
clientsRouter.delete("/:clientId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const detailClient = yield Clients.findOne({ where: { clientId } });
        if (!detailClient) {
            return res
                .status(404)
                .json({ success: false, errorMessage: "해당 클라이언트가 없습니다." });
        }
        yield Clients.destroy({ where: { clientId } });
        res
            .status(200)
            .json({ success: true, message: "클라이언트를 삭제하였습니다." });
    }
    catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
            success: false,
            errorMessage: "클라이언트 삭제에 실패하였습니다.",
        });
    }
}));
exports.default = clientsRouter;
