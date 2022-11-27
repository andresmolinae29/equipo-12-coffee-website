const express = require('express');
const router = express.Router();

const validateRegisterForm = require('../middlewares/validateRegisterMiddleware');
const validateLoginForm = require('../middlewares/validateLoginMiddleware');

// ************ Middelwares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const userController = require('../controllers/userController');


const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images/users");
	},

	filename: function (req, file, cb) {
		const newFileName = 'img-' + Date.now() + path.extname(file.originalname);
		cb(null, newFileName);
	}
})

const uploadFile = multer({ storage })

router.get(
	'/register', 
	guestMiddleware,
	userController.register
	);

router.post(
	'/register', 
	uploadFile.single('avatar'), 
	validateRegisterForm, 
	userController.registerUserProcess
	);

router.get(
	'/login', 
	guestMiddleware,
	userController.login
	);

router.post(
	'/login', 
	validateLoginForm, 
	userController.loginProcess
	);

router.get(
	'/logout',
	userController.logout
)

module.exports = router;