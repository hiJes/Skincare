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
        if (!user) {throw "User not found!"};
        const isValidUser = bcrypt.compareSync(password, user.password);
        if (!isValidUser) {throw "Wrong password!"};
        req.session.userId = user.id;
        if (role !== user.dataValues.role) {throw "Wrong role!"}
        let id = user.dataValues.id
        return User.findByPk (id,{include:ProfileUser})
      })
      .then((user) => {
        let {ProfileUser, role, id} = user.dataValues
        if (!ProfileUser) {
          res.redirect (`/user/${id}`)
        } else if (role === "Admin"){
          res.redirect(`/user/${id}/admin/profile`)
        } else if (role === "Customer") {
          res.redirect(`/user/${id}/customer/profile`)
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

  static formProfile(req, res) {
    let {id} = req.params
    let { errors } = req.query;
    res.render ("profileUser.ejs", {id, errors})
  }

  static createProfile(req, res) {
    let {id} = req.params
    let {name, gender, address, dateOfBirth, telephone, profilePicture} = req.body
    // console.log(id, req.body);
    ProfileUser.create({name, gender, address, dateOfBirth, telephone, profilePicture,
      UserId: id
    })
      .then(()=>{
        return User.findByPk (id)
      })
      .then((user)=>{
        let role = user.dataValues.role
        if (role === "Admin"){
          res.redirect(`/user/${id}/admin/profile`)
        } else if (role === "Customer"){
          res.redirect(`/user/${id}/customer/profile`)
        }
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === "SequelizeValidationError") {
          let errors = err.errors.map((e) => e.message);
          res.redirect(`/user/${id}?errors=${errors}`);
        } else {
          res.send(err);
        }
      });
  }

  static showProfileAdmin (req, res){
    let {id} = req.params
   
    User.findByPk(id,{include: ProfileUser})
      .then ((admin)=> {
        res.render ("profileAdmin.ejs", {admin})
      })
      .catch((err) => {
        res.send(err);
        // console.log(err);
      });
  }

  static showProfileCustomer (req, res){
    let {id} = req.params
   
    User.findByPk(id,{include: ProfileUser})
      .then ((customer)=> {
        res.render ("profileCustomer.ejs", {customer})
      })
      .catch((err) => {
        res.send(err);
        // console.log(err);
      });
  }

}

module.exports = Controller;
