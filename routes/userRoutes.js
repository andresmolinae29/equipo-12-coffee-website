const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mainController = require('../controllers/userController');

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

// router.get('/register', mainController.register);
router.post('/register', uploadFile.single('avatar'), mainController.registerUserProcess);

module.exports = router;