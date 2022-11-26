const { getProducts } = require('../services/productService');

const mainController = {

    index: async (req, res) => {
        const response = await getProducts();
        return res.render("home", response)
    },
    create: (req, res) => {
        return res.render("product-create-form")
    },
    edit: (req, res) => {
        return res.render("product-edit-form")
    },
    cart: (req, res) => {
        return res.render("cart")
    },
    login: (req, res) => {
        return res.render("login")
    },
    register: (req, res) => {
        return res.render("register");
    },
    item: (req, res) => {
        return res.render("item")
    },
}

module.exports = mainController;