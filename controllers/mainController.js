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
    },
    nuestroCafe: (req, res) => {
        return res.render("nuestroCafe")

    },
    recetas: (req, res) => {
        return res.render("recetas")
    },

    productos: async (req, res) => {
        const products = await getProducts();
        return res.render("productos", { products : products.products } )
    },
}

module.exports = mainController;