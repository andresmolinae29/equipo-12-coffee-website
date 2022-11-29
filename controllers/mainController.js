const { setRandomFallback } = require('bcryptjs');
const { getProducts, getFilterProducts } = require('../services/productService');

// const response = await getProducts();
        // console.log(response);

const mainController = {

    index: async (req, res) => {
        
        const newProducts = await getFilterProducts("category", "new");
        const saleProducts = await getFilterProducts("category", "sale");

        return res.render("home", { newProducts : newProducts.products , saleProducts : saleProducts.products })
    },

    cart: (req, res) => {
        return res.render("cart")
    },

    item: (req, res) => {
        return res.render("item")
    }
}

module.exports = mainController;