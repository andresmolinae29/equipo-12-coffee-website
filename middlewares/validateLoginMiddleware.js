const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('No puede estar vacio').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Debe escribir una contrasena')
];