const { setRandomFallback } = require('bcryptjs');
const { getProducts, getFilterProducts } = require('../services/productService');

// const response = await getProducts();
        // console.log(response);

const mainController = {

    index: async (req, res) => {
        
        const newProducts = await getFilterProducts("category", "new");
        const saleProducts = await getFilterProducts("category", "sale");

        console.log(newProducts, saleProducts);

        return res.render("home", { newProducts : newProducts.products , saleProducts : saleProducts.products })
    },

    cart: (req, res) => {
        return res.render("cart")
    },

    item: (req, res) => {
        return res.render("item")
    },

    test: (req, res) => {
        return res.render("test")
    },

    testSend: (req, res) => {
        console.log(req.body);
        return res.render("test")
    }
}

module.exports = mainController;