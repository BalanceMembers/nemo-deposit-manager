"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginManager_1 = __importDefault(require("./LoginManager"));
const usersRouter = express_1.default.Router();
const loginManger = new LoginManager_1.default();
// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user)
        next();
    else
        next("route");
}
// if logged in
usersRouter.get("/", isAuthenticated, function (req, res) {
    console.log(req.session);
    res.send("hello, user");
});
// if not logged in
usersRouter.get("/", function (req, res) {
    console.log(req.session);
    res.send("로그인 해주세요.");
});
// login&out features
usersRouter.post("/login", loginManger.login);
usersRouter.post("/logout", loginManger.logout);
exports.default = usersRouter;
