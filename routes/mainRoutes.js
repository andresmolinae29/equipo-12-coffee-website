const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/cart', mainController.cart);

router.get('/nuestro-cafe', mainController.nuestroCafe);

router.get('/recetas', mainController.recetas);

router.get('/productos', mainController.productos);

module.exports = router