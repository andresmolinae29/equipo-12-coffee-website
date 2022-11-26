const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/cart', mainController.cart);
router.get('/login', mainController.login);

router.get('/register', mainController.register);
router.post('/register', mainController.registerUserProcess);

router.get('/create', mainController.create);
router.get('/item', mainController.item);

module.exports = router