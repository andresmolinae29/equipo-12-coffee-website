const { body } = require('express-validator');

module.exports = [
    body('user').notEmpty().withMessage('El usuario no puede estar vacio'),
    body('password').notEmpty().withMessage('Debe escribir una contrasena'),
    body('passwordConfirmation')
        .notEmpty().isbail()
        .equals(body('password'))
        .withMessage('Debe ser igual a la contrasena'),
    body('email')
        .notEmpty().withMessage('No puede estar vacio').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('fullName').notEmpty().withMessage('El nombre no debe estar vacio'),
    body('birthDate')
        .notEmpty().withMessage('No debe estar vacio').bail()
        .isDate().withMessage('Debe ser formato fecha')
]