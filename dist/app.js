"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./routes/index"));
const ioredis_1 = __importDefault(require("ioredis"));
const RedisStore = require("connect-redis")(express_session_1.default);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
let redisClient = new ioredis_1.default();
let option = {
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
        httpOnly: true,
        maxAge: 900000,
        secure: false,
    },
};
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    option.cookie.secure = true; // serve secure cookies
}
app.use((0, express_session_1.default)(option));
// set routers
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
app.use("/api", index_1.default);
// set view engine and  error handlers
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
// sequelize 연결
const { sequelize } = require("./models/index");
sequelize
    .sync({ force: false })
    .then(() => {
    console.log("데이터베이스 연결 성공");
})
    .catch((error) => {
    console.log(`데이터베이스 연결 실패 ${error}`);
});
module.exports = app;
