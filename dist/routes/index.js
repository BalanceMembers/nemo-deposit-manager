"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter = express_1.default.Router();
const users_1 = __importDefault(require("./users"));
const balances_1 = __importDefault(require("./balances"));
const clients_1 = __importDefault(require("./clients"));
indexRouter.get("/", function (req, res, next) {
    res.send("API로 연결됩니다.");
});
indexRouter.use("/balances", balances_1.default);
indexRouter.use("/users", users_1.default);
indexRouter.use("/clients", clients_1.default);
exports.default = indexRouter;
