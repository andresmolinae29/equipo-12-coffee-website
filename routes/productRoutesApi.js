// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const validateCreateForm = require('../middlewares/validateCreateProductMiddleware');

// ************ Controller Require ************
const productsController = require('../controllers/productControllerApi.js');

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
router.get('/getAll', productsController.listAll); 

router.get('/getFiltered', productsController.filterDataByCategory);

/*** CREATE ONE PRODUCT ***/ 

router.post(
	'/create', 
	validateCreateForm, 
	uploadFile.single('product-image'), 
	productsController.store
	);

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.put('/edit/:id', productsController.update); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy);

router.get('/categories', productsController.categories);

router.get('/lastProduct', productsController.lastProduct);

module.exports = router;