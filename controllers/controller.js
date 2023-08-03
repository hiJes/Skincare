const { User } = require("../models");
const bcrypt = require("bcrypt");

class Controller {
  static home(req, res) {
    res.render("home.ejs");
  }

  static user(req, res) {
    res.send("user");
  }

  static formRegister(req, res) {
    res.render("register.ejs");
  }

  static createUserRegister(req, res) {
    let { userName, email, password, role } = req.body;
    User.create({ userName, email, password, role })
      .then((user) => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  }

  static formLogin(req, res) {
    res.render("login.ejs");
  }

  static createUserLogin(req, res) {
    let { userName, password } = req.body;
    User.findOne({
      where: { userName },
    })
      .then((user) => {
        if (!user) throw "Unregister email!";
        const isValidUser = bcrypt.compareSync(password, user.password);
        if (!isValidUser) throw "Wrong password!";
        req.session.userId = user.id;
        res.render("profileUser.ejs");
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  }
}

module.exports = Controller;
