class LoginManager {
  login = (req, res) => {
    if (
      req.body.id === process.env.ADMIN_ID &&
      req.body.pw === process.env.ADMIN_PWD
    ) {
      req.session.regenerate(function (err) {
        if (err) next(err);
        req.session.user = { id: req.body.id };
        req.session.save(function (err) {
          if (err) return next(err);
          res.redirect("/admin");
        });
      });
    } else if (
      req.body.id === process.env.TEMP_ID &&
      req.body.pw === process.env.TEMP_PWD
    ) {
      req.session.regenerate(function (err) {
        if (err) next(err);
        req.session.user = { id: req.body.id };
        req.session.save(function (err) {
          if (err) return next(err);
          res.redirect("/home");
        });
      });
    } else {
      res.redirect("/");
    }
  };

  logout = (req, res, next) => {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);
      req.session.regenerate(function (err) {
        if (err) next(err);
        console.log(req.session);
        res.redirect("/a");
      });
    });
  };
}

module.exports = LoginManager;
