const express = require('express')
const adminController = require('../controllers/admContoller')
const router = express.Router()

router.put('/users/:id/update', adminController.adminUpdateUser)

router.delete('/users/:id/delete', adminController.adminDeteleUser)

module.exports = router