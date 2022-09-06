const mainController = {

    index: (req, res) => {
        return res.render("home")
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