const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if (emailInCookie) {
        User.findOneUser('email', emailInCookie)
            .then(user => {

                req.session.userLogged = user;

                if (emailInCookie) {
                    delete userFromCookie.password;
                }
                if (userFromCookie) {
                    req.session.userLogged = userFromCookie;
                }
                return user;
            }
            )
            .catch(errors => {
                return "fallo";
            })
    }


    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    console.log(res.locals.userLogged)

    next();
}

module.exports = userLoggedMiddleware;