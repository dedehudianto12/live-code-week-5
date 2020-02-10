"use strict"

const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const comicRoutes = require('./comic')

router.use('/', userRoutes)
router.use('/comics', comicRoutes)

module.exports = router
