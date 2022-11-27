// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/userControllerApi');

router.get('/getAll', usersController.listAll); 
router.post(
    '/register', 
    usersController.processRegister
    );

router.put('/edit/:id', usersController.edit);

router.delete('/delete/:id', usersController.destroy);

router.post(
    '/login', 
    usersController.loginProcess);

// router.get('/logout/', usersController.logout);

module.exports = router;