const LoginManager = require("./LoginManager.js");
const loginManger = new LoginManager();

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else next("route");
}

// if logged in
router.get("/", isAuthenticated, function (req, res) {
  console.log(req.session);
  res.send("hello, user");
});

// if not logged in
router.get("/", function (req, res) {
  console.log(req.session);
  res.send("로그인 해주세요.");
});

// login&out features
router.post("/login", loginManger.login);
router.post("/logout", loginManger.logout);

module.exports = router;
