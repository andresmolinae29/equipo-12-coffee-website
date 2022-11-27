const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('userName').notEmpty().withMessage('El usuario no puede estar vacio'),
    body('fullName').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña'),
    body('passwordConfirmation')
        .notEmpty()
        .withMessage('Debe ser igual a la contraseña'),
    body('email')
        .notEmpty().withMessage('No puede estar vacio').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
]