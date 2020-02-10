"use strict"

const express = require('express')
const router = express.Router()

const comicController = require('../controller.js/comicController')
const auth = require('../middlewares/auth')

router.use(auth.authenticate)
router.get('/', comicController.findAll)
router.get('/:id', comicController.findOne)
router.put('/:id', comicController.update)

module.exports = router
