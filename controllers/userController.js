const { getProducts } = require('../services/productService');
const { registerUser } = require('../services/userService');

const userController = {

    registerUserProcess: (req, res) => {

        const data = {
            ...req.body,
            avatar: req.file.filename ? "img-default.jpg" : req.file.filename
        };

        console.log(data);

        registerUser(data)
            .then(result => {
                console.log(result)
                if (result.errors) {
                    return res.render("register", {
                        message: errors
                    });
                } else {
                    return res.redirect("/")
                }
                
            })
            .catch(errors => {
                return res.render("register", {
                    message: errors
                })
            })
    },

    item: (req, res) => {
        return res.render("item")
    },
}

module.exports = userController;