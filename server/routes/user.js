"use strict"

const express = require('express')
const router = express.Router()

const userController = require('../controller.js/userController')

router.post('/login', userController.login)
router.post('/register', userController.create)

module.exports = router
