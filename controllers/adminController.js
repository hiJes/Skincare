const formatRupiah = require("../helpers/helper")
const {Product, Category, User, ProfileUser, Transaction, TransactionProduct} = require ("../models")
const {Op} = require ("sequelize")

class AdminController {
  static findAllProduct (req, res) {
    let products
    Product.findAll({
      include:Category,
      where: {
        stock: {
          [Op.gt]:0
        }
      },
      order : [['name', 'asc']]
    })
      .then ((data)=>{
        products = data
        return Category.findAll() 
      })
      .then ((category)=>{
        res.render ("adminProduct.ejs", {products, category,formatRupiah})
      })
      .catch ((err) => {
        // console.log(err);
        res.send(err)
      })
  }
  static emptyProduct (req, res) {
    let products
    Product.findAll({
      include:Category,
      where: {
        stock: {
          [Op.eq]:0
        }
      } 
    })
      .then ((data)=>{
        products = data
        return Category.findAll() 
      })
      .then ((category)=>{
        res.render ("emptyProduct.ejs", {products, category,formatRupiah})
      })
      .catch ((err) => {
        // console.log(err);
        res.send(err)
      })
  }
  static addProduct (req, res){
    let {errors} = req.query
    Category.findAll()
    .then ((category)=>{
      res.render ("addProduct.ejs", {category, errors})
    })
    .catch ((err) => {
      // console.log(err);
      res.send(err)
    })
  }
  static saveProduct (req, res){
    let {name, brand, description, price, photo, stock, CategoryId} = req.body
    // console.log(req.body);
    Product.create({name, brand, description, price, photo, stock, CategoryId})
    .then (()=>{
      res.redirect ("/products")
    })
    .catch ((err) => {
      // console.log(err);
      if (err.name = "SequelizeValidationerrors") {
        let errors = err.errors.map (e => {
          return e.message
        })
        res.redirect(`/products/add?errors=${errors}`)
      }
      else {
        res.send(err)
      }
    })
  }
  static deleteProduct (req, res) {
    let {id} = req.params
    // console.log(id);
    Product.destroy({
      where: { id }
    })
    .then (()=>{
      res.redirect ("/products")
    })
    .catch ((err) => {
      res.send(err)
    })
  }
  static productDetail (req, res) {
    let {id} = req.params
    // console.log(id);
    Product.findByPk(+id, {include:Category})
    .then ((product)=>{
      // res.send(product)
      res.render ("productDetail.ejs", {product,formatRupiah})
    })
    .catch ((err) => {

      res.send(err)
    })
  }
  static editProduct (req, res) {
    let {id} = req.params
    let {errors} = req.query
    let product
    // console.log(id);
    Product.findByPk(+id)
    .then ((data)=>{
      // res.send(product)
      product = data
      return Category.findAll()
    })
    .then ((category)=>{
      // res.send(product)
      res.render ("editProduct.ejs", {product, category, errors})
    })
    .catch ((err) => {
      res.send(err)
    })
  }
  static updateProduct (req, res){
    let {id} = req.params
    let {name, brand, description, price, photo, stock, CategoryId} = req.body
    // console.log(req.body);
    Product.update({name, brand, description, price, photo, stock, CategoryId},{
      where: { id }
    })
    .then (()=>{
      res.redirect (`/products/${id}`)
    })
    .catch ((err) => {
      // console.log(err);
      if (err.name = "SequelizeValidationerrors") {
        let errors = err.errors.map (e => {
          return e.message
        })
        res.redirect(`/products/${id}/edit?errors=${errors}`)
      }
      else {
        res.send(err)
      }
    })
  }
  static reStockProduct (req, res){
    let {id} = req.params
    let {errors} = req.query
    Product.findByPk(+id)
    .then ((product)=>{
      // res.send(product)
      res.render ("reStock.ejs", {product, errors})
    })
    .catch ((err) => {
      res.send(err)
    })
  }
  static updateReStockProduct (req, res){
    let {id} = req.params
    let {stock} = req.body
    // console.log(req.body);
    Product.update({stock},{
      where: { id }
    })
    .then (()=>{
      res.redirect (`/products/emptyList`)
    })
    .catch ((err) => {
      // console.log(err);
      if (err.name = "SequelizeValidationerrors") {
        let errors = err.errors.map (e => {
          return e.message
        })
        res.redirect(`/products/emptyList/stock/${id}?errors=${errors}`)
      }
      else {
        res.send(err)
      }
    })
  }
  static addStock (req, res) {
    let {id} = req.params
    Product.increment(
      {
        stock: 1
      }, 
      { 
        where: { 
          id
        } 
      }
    )
    .then (()=>{
      res.redirect ("/products")
    })
    .catch ((err) => {
      res.send(err)
    })
  }
  static findAllCustomer (req, res) {
    User.findAll({
      where: {
        role: false//ganti jadi Customer
      }
    })
    .then ((customers)=>{
      res.render ("adminCustomer.ejs", {customers})
    })
    .catch ((err) => {
      // console.log(err);
      res.send(err)
    })
  }//ganti dari boolean jadi customer
  static transaction (req, res) {
    let {id} = req.params
    // User.findByPk(id, , {include:Transaction})
    Transaction.findAll()
    .then ((customers)=>{
      // res.render ("transaction.ejs", {customers})
      res.send (customers)
    })
    .catch ((err) => {
      // console.log(err);
      res.send(err)
    })
  }//ganti dari boolean jadi customer
}

module.exports = AdminController