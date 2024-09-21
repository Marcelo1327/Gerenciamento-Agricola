const express = require('express');
const Task = require('../models/user'); 
const router = express.Router();
const userControllers = require('../controllers/user_controller')
const authenticToken = require('../../config/js/anthentic');
const user = require('../models/user');



router.get('/users/profile', userControllers.getUser)

router.post('/users/register', userControllers.postUser)

router.post('/users/login', userControllers.loginUser)

router.put('/users/update', userControllers.updateUser)

router.delete('/users/delete', userControllers.deleteUser)

module.exports = router;
