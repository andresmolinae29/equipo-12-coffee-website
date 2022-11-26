const User = require('../models/User');

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;

    // let emailInCookie = req.cookies.userEmail;
    // let userFromCookie = User.findOneUser('email', emailInCookie);

    // if (emailInCookie) {
    //     delete userFromCookie.password;
    // }

    // // delete userFromCookie.password; // revisar si toca borrar esto!!

    // if (userFromCookie) {
    //     req.session.userLogged = userFromCookie;
    // }

    // if (req.session && req.session.userLogged) {
    //     res.locals.isLogged = true;
    //     res.locals.userLogged = req.session.userLogged;
    // }

    next();
}

module.exports = userLoggedMiddleware;