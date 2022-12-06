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

        let data = req.body;

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
                    // cambie esto de "/" a "/profile" para que al loguear vaya al perfil
                    return res.redirect("/user/profile");
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
                        message: result.message,
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

    profile: (req, res) => {
        return res.render('profile');
    }
}

module.exports = userController;