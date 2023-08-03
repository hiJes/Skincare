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
router.get('/products', Controller)
router.get('/products/add', Controller)
router.post('/products/add', Controller)
router.post('/products/emptyList', Controller)
router.get('/products/stock/:id', Controller) //increment
router.post('/products/stock/:id', Controller)
router.get('/products/delete/:id', Controller)
router.get('/products/:id', Controller)
router.get('/products/:id/edit', Controller) //ganti semua kecuali stock
router.post('/products/:id/edit', Controller)
router.post('/customer-transaction', Controller)

// Customer Page
router.get('/list-products', Controller)
router.get('/list-products/buy', Controller)//update barang ke keranjang
router.get('/cart', Controller)
router.get('/cart/checkout', Controller) //masuk ke table transaction
router.post('/cart/checkout', Controller)
router.get('/cart/transaction', Controller) //list transaction -> package
router.get('/cart/transaction/:id/delete', Controller) // batalin transaksi 
