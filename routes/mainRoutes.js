const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mainController = require('../controllers/mainController');
const guestMiddleware = require('../middlewares/guestMiddleware');

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

router.get("/test", mainController.test);
router.post("/test", mainController.testSend);

module.exports = router