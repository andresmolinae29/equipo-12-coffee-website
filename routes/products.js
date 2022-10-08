// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

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
router.post('/create', uploadFile.single('product-image'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.post('/edit/:id', productsController.update); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;