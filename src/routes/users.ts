import express, { Request, Response, NextFunction } from "express";
import LoginManager from "./LoginManager";

const usersRouter = express.Router();
const loginManger = new LoginManager();

// middleware to test if authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) next();
  else next("route");
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

export default usersRouter;
