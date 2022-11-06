function authMiddleware(req, res, next) {
    if (!req.session.userLogued) {
       return res.redirect('/user/login');
    } 
    next();
}

module.exports = authMiddleware;