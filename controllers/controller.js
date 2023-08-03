const { User, ProfileUser } = require("../models");
const bcrypt = require("bcrypt");
const { ValidationError } = require("sequelize");

class Controller {
  static home(req, res) {
    res.render("home.ejs");
  }

  static formRegister(req, res) {
    let { errors } = req.query;
    res.render("register.ejs", { errors });
  }

  static createUserRegister(req, res) {
    let { userName, email, password, role } = req.body;
    User.create({ userName, email, password, role })
      .then((user) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "SequelizeValidationError") {
          let errors = err.errors.map((e) => e.message);
          res.redirect(`/register/?errors=${errors}`);
        } else {
          res.send(err);
        }
      });
  }

  static formLogin(req, res) {
    let { error } = req.query;
    res.render("login.ejs", { error });
  }

  static createUserLogin(req, res) {
    let { userName, password, role } = req.body;
    User.findOne({
      where: { userName },
    })
      .then((user) => {
        if (!user) throw "User not found!";
        const isValidUser = bcrypt.compareSync(password, user.password);
        if (!isValidUser) throw "Wrong password!";
        req.session.userId = user.id;
//         if (role === "Customer") {
//           res.redirect("/list-products");
//         } else if (role === "Admin") {
//           res.redirect("/products");
//         }
        if (role !== user.dataValues.role) throw "Wrong role!"
        let id = user.dataValues.id
        return User.findByPk (id,{include:ProfileUser})
      })
      .then((user) => {
        let profile = user.dataValues.ProfileUser
        let role = user.dataValues.role
        if (!profile){
          res.render ("profileUser.ejs")
        }
      })
      .catch((err) => {
        res.send(err);
        // console.log(err);
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.redirect("/login");
    });
  }
}

module.exports = Controller;
