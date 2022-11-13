import express from "express";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import indexRouter from "./routes/index";
import Redis from "ioredis";

const RedisStore = require("connect-redis")(session);

const app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set session
declare module "express-session" {
  export interface SessionData {
    user: { id: string } | null;
    isLoggedIn: boolean;
  }
}

let redisClient = new Redis();
let option = {
  secret: process.env.SESSION_KEY!,
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: true,
    maxAge: 900000, // 15min
    secure: false,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  option.cookie.secure = true; // serve secure cookies
}

app.use(session(option));

// set routers
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api", indexRouter);

// set view engine and  error handlers
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// sequelize 연결
const { sequelize } = require("./models/index");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error: Error) => {
    console.log(`데이터베이스 연결 실패 ${error}`);
  });

module.exports = app;
