const express = require('express');
const router = express.Router();

const validateCreateProductForm = require('../middlewares/validateCreateProductMiddleware');
const login = require('../middlewares/guestMiddleware');
// ************ Middelwares ************
const productController = require('../controllers/productController');


const path = require('path');
const multer = require('multer');
const mainController = require('../controllers/mainController');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images/products");
	},

	filename: function (req, file, cb) {
		const newFileName = 'img-' + Date.now() + path.extname(file.originalname);
		cb(null, newFileName);
	}
})

const uploadFile = multer({ storage })

router.get(
	'/create', 
	// login, 
	productController.create);

router.post(
	'/create',
	uploadFile.single('img'),
	validateCreateProductForm,
	productController.createProcess
	);

router.get('/detail/:id', productController.viewDetail);

router.get('/edit/:id', productController.edit);
router.put(
	'/edit/:id',
	uploadFile.single('img'),
	validateCreateProductForm,
	productController.editProcess
	);

router.get('/manage-products', productController.management);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;