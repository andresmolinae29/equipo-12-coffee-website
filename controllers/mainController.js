
const mainController = {

    index: (req, res) => {
        return res.render("home")
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
        return res.render("register")
    },    
    item: (req, res) => {
        return res.render("item")
    },    
}

module.exports = mainController;