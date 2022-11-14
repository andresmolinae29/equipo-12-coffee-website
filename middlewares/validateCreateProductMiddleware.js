const { body } = require('express-validator');
const path = require('path')

module.exports = [
	body('name').notEmpty().withMessage("Debes completar el campo"),
	body('description').notEmpty().withMessage("Debes completar el campo"),
	body('size').notEmpty().withMessage("Debes completar el campo"),
	body('price').notEmpty()
        .isNumeric().withMessage("Debes completar este campo y debe ser un numero"),
	body('category').notEmpty().withMessage("Debes completar el campo"),
	body('longDescription').notEmpty().withMessage("Debes completar el campo"),
	body('sellingCategory').notEmpty().withMessage("Debes completar el campo"),
    body('fileName').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }

        return true;
    })
];