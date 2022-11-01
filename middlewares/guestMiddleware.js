function guestMiddleware(req, res, next) {
    if (req.session.userLogued != undefined) {
        next();
    } else {
        res.render('/');
    }
}

module.exports = guestMiddleware;