"use strict"

const { User } = require('../models')
const jwt = require('../helper/jwt')

function authenticate(req, res, next) {
    try {
        const token = jwt.checkToken(req.headers.access_token)
        User.findByPk(token.id)
            .then(user => {
                if (!user) {
                    next({ message: 'user not found' })
                } else {
                    req.userId = token.id
                    next()
                }
            })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate
}