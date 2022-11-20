const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const indexRouter = require("./src/routes/index");

const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);

const app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set session

let redisClient = new Redis();
let option = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: true,
    maxAge: 900000, // 15min
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  option.cookie.secure = true; // serve secure cookies
}

app.use(session(option));

// set routers
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/api", indexRouter);

// set view engine and  error handlers
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// sequelize 연결
const { sequelize } = require("./src/models/index");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.log(`데이터베이스 연결 실패 ${error}`);
  });

module.exports = app;
