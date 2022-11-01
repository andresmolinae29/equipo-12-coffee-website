// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// ************ Validator ************

const validateCreateForm = [
	body('name').notEmpty().withMessage("Debes completar el campo"),
	body('description').notEmpty().withMessage("Debes completar el campo"),
	body('size').notEmpty().withMessage("Debes completar el campo"),
	body('price').notEmpty().isNumeric().withMessage("Debes completar este campo y debe ser un numero"),
];

const validateLoginForm =[
	body('email').notEmpty().withMessage("Debes completar el campo"),
	body('password').notEmpty().withMessage("Debes completar el campo"),
];

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/images/users");
	},

	filename: function(req, file, cb) {
		const newFileName = 'img-' + Date.now() + path.extname(file.originalname); 
		cb(null,
			newFileName);
	}
})

const uploadFile = multer({ storage })


router.get('/register', guestMiddleware, usersController.register); 
router.post('/register', validateCreateForm, uploadFile.single('avatar-image'), usersController.store); 

router.get('/login', usersController.login);
router.post('/login', validateLoginForm, usersController.processLogin)

module.exports = router;