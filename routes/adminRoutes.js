const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/dashboard', adminController.dashboard);
router.get('/admin/products', adminController.getProducts);
router.get('/admin/products/delete/:id', adminController.deleteProducts)
router.get('/admin/products/edit/:id', adminController.getEditProduct)


router.post('/admin/add', adminController.addProduct);
router.post('/admin/products/edit/:id', adminController.updateProducts);

module.exports = router;