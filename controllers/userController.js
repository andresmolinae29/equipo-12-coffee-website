const { registerUser, loginUser } = require('../services/userService');
const { validationResult } = require('express-validator');

const userController = {

    login: (req, res) => {
        return res.render("login");
    },

    loginProcess: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
      
            return res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let data = req.body

        loginUser(data)
            .then(result => {
              
                if (result.message) {
                    return res.render("login", {
                        message: result.message
                    });
                } else {

                    delete result.userLogged.password;
                    req.session.userLogged = result.userLogged;

                    if (req.body.rememberMe) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60})
                    }

                    return res.redirect("/");
                }

            })
            .catch(errors => {
                return res.render("login", {
                    message: errors
                })
            })
    },

    register: (req, res) => {
        return res.render("register");
    },

    registerUserProcess: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.mapped());
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let filename = req.file ? req.file.filename : "img-default.jpg";

        const data = {
            ...req.body,
            avatar: filename
        };

        registerUser(data)
            .then(result => {
                if (result.message) {
                
                    return res.render("register", {
                        errors: result.message,
                    });
                } else {
                    return res.redirect("/user/login");
                }
            })
            .catch(errors => {
                return res.render("register", {
                    message: errors
                })
            })
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
}

module.exports = userController;