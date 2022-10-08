const fs = require('fs');

function logDBMiddleware(req, res, next) {
    fs.appendFileSync('logDB.txt', 'Se ingreso en la pagina' + req.url);
    next();
}

module.exports = logDBMiddleware;