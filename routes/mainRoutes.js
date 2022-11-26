const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mainController = require('../controllers/mainController');

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

router.get('/', mainController.index);
router.get('/cart', mainController.cart);
router.get('/login', mainController.login);

router.get('/register', mainController.register);
// router.post('/register', uploadFile.single('avatar'), mainController.registerUserProcess);

router.get('/create', mainController.create);
router.get('/item', mainController.item);

module.exports = router