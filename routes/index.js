const AdminController = require('../controllers/adminController')
const Controller = require('../controllers/controller')
const router = require('express').Router()

module.exports = router


router.get('/', Controller.home) //regis, login, logut

router.get('/register', Controller)
router.post('/register', Controller)

router.get('/login', Controller)
router.post('/login', Controller)

router.get('/logout', Controller)

router.get('/admin/profile', Controller)
router.get('/admin/profile/edit', Controller)
router.post('/admin/profile/edit', Controller)

router.get('/customer/profile', Controller)
router.get('/customer/profile/edit', Controller)
router.post('/customer/profile/edit', Controller)

// Admin Page
router.get('/products', AdminController.findAllProduct)
router.get('/products/add', AdminController.addProduct)
router.post('/products/add', AdminController.saveProduct)
router.get('/products/emptyList', AdminController.emptyProduct)
router.get('/products/emptyList/stock/:id', AdminController.reStockProduct) 
router.post('/products/emptyList/stock/:id', AdminController.updateReStockProduct)
router.get('/products/addStock/:id', AdminController.addStock)
router.get('/products/delete/:id', AdminController.deleteProduct)
router.get('/products/:id', AdminController.productDetail)
router.get('/products/:id/edit', AdminController.editProduct) //ganti semua kecuali stock
router.post('/products/:id/edit', AdminController.updateProduct)
router.get('/customers', AdminController.findAllCustomer)
router.get('/customers/:id', AdminController)
router.get('/customers/transaction/:id', AdminController.transaction)

// Customer Page
router.get('/list-products', Controller)
router.get('/list-products/buy', Controller)//update barang ke keranjang
router.get('/cart', Controller)
router.get('/cart/checkout', Controller) //masuk ke table transaction
router.post('/cart/checkout', Controller)
router.get('/cart/transaction', Controller) //list transaction -> package
router.get('/cart/transaction/:id/delete', Controller) // batalin transaksi 
