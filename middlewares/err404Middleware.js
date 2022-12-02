const fs = require('fs');

function errMiddleware(req, res, next) {
    res.status(404).render("404")
    next();
}

module.exports = errMiddleware; 