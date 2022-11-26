const { body } = require('express-validator');

module.exports = [
    body('userName').notEmpty().withMessage('El usuario no puede estar vacio'),
    body('fullName').notEmpty().withMessage('El usuario no puede estar vacio'),
    body('password').notEmpty().withMessage('Debe escribir una contrasena'),
    body('passwordConfirmation')
        .notEmpty()
        // .equals(body('password'))
        .withMessage('Debe ser igual a la contrasena'),
    body('email')
        .notEmpty().withMessage('No puede estar vacio')
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('avatar').notEmpty().withMessage('El nombre no debe estar vacio')
]