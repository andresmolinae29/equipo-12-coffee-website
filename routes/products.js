// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ************ Validator ************

const validateCreateForm = [
	body('name').notEmpty().withMessage("Debes completar el campo"),
	body('description').notEmpty().withMessage("Debes completar el campo"),
	body('size').notEmpty().withMessage("Debes completar el campo"),
	body('price').notEmpty().isNumeric().withMessage("Debes completar este campo y debe ser un numero"),
	body('category').notEmpty().withMessage("Debes completar el campo"),
	body('longDescription').notEmpty().withMessage("Debes completar el campo"),
	body('sellingCategory').notEmpty().withMessage("Debes completar el campo")
];

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "public/images/products");
	},

	filename: function(req, file, cb) {
		const newFileName = 'img-' + Date.now() + path.extname(file.originalname); 
		cb(null,
			newFileName);
	}
})

const uploadFile = multer({ storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', validateCreateForm, uploadFile.single('product-image'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.post('/edit/:id', productsController.update); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;