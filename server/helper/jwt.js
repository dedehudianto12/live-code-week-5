"use strict"

const jwt = require("jsonwebtoken")

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET)
}

function checkToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    checkToken
}