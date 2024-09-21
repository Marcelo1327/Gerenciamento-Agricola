const express = require('express')
const adminController = require('../controllers/adm_contoller')
const router = express.Router()

router.put('/users/:id/update', adminController.adminUpdateUser)

router.delete('/users/:id/delete', adminController.adminDeteleUser)

module.exports = router