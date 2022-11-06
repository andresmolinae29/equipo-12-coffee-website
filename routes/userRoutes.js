// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Middelwares ************
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const validateRegisterForm = require('../middlewares/validateRegisterMiddleware');
const validateLoginForm = require('../middleware/validateLoginMiddleware')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', guestMiddleware, usersController.register); 
router.post('/register', validateRegisterForm, usersController.processRegister); 

router.get('/login', guestMiddleware,usersController.login);
router.post('/login', validateLoginForm, usersController.processLogin)

router.get('/profile/', authMiddleware, usersController.profile);

router.get('/logout/', usersController.logout);

module.exports = router;