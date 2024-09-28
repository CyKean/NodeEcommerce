const Product = require('../models/Product');

const messages = {}; // Temporary storage for messages

const admin = {
    dashboard:(req, res) => {
        res.render('admin/dashboard')
    },

    products:(req, res) => {
        res.render('admin/products');
    },

    addProduct: async (req, res) => {
        const success_msg = 'Successfully added product';
        const error_msg = 'Failed to add product';
        
        try {
            const product = new Product(req.body);
            await product.save();
            messages['productMessage'] = success_msg; // Store success message
            return res.redirect('/admin/products'); // Redirect to products page
        } catch (err) {
            console.error(err.message);
            messages['productMessage'] = error_msg; // Store error message
            return res.redirect('/admin/products'); // Redirect to products page
        }
    },
    
    getProducts: async (req, res) => {
        const productMessages = messages['productMessage'] || null; // Retrieve message if it exists
        delete messages['productMessage']; // Clear the message after use
    
        try {
            const products = await Product.findAll(); 
            res.render('admin/products', { products: products, productMessage: productMessages }); 
        } catch (err) {
            console.error(err.message);
            res.render('admin/products', { products: [], error_msg: 'Failed to load products.' }); // Handle errors
        }
    },

    deleteProducts: async (req, res) => {
        const productId = req.params.id;
        const success_msg = 'Successfully deleted product';
        const error_msg = 'Failed to delete product';
    
        try {
            await Product.destroy({ where: { id: productId } });
            messages['productMessage'] = success_msg; // Store success message
        } catch (err) {
            console.error(err.message);
            messages['productMessage'] = error_msg; // Store error message
        } finally {
            return res.redirect('/admin/products'); // Redirect to products page
        }
    },

    getEditProduct: async (req, res) => {
        const productId = req.params.id;
        const productMessages = messages['productMessage'] || null; // Retrieve message if it exists
        delete messages['productMessage']; // Clear the message after use
        
        try {
            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).send('Product not found');
            
            res.render('admin/edit_product', { product: product, productMessage: productMessages });
        } catch (err) {
            console.error(err.message);
            res.render('admin/edit_product', { product: null, error_msg: 'Failed to load product.' }); // Handle errors
        }
    },

    updateProducts: async (req, res) => {
        const productId = req.params.id;
        const success_msg = 'Successfully updated product';
        const error_msg = 'Failed to update product';
        
        try {
            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).send('Product not found');
            
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.stock = req.body.stock;
            product.category = req.body.category;
            await product.save();
            
            messages['productMessage'] = success_msg; // Store success message
            return res.redirect('/admin/products'); // Redirect to products page
        } catch (err) {
            console.error(err.message);
            messages['productMessage'] = error_msg; // Store error message
            return res.redirect('/admin/products'); // Redirect to products page
        }
    },
    
}

module.exports = admin;