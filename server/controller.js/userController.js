"use strict"

const { User } = require('../models')
const jwt = require('../helper/jwt')
const bcrypt = require('../helper/bcrypt')

class UserController {
    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    next({ message: 'email/password salah' })
                } else {
                    if (user.name === 'Hary Tirta' || user.name === 'Rubhi Prakoso') {
                        if (user.password !== req.body.password) {
                            next({ message: 'email/password salah' })
                        } else {
                            let token = jwt.generateToken(user)
                            res.status(200).json({
                                access_token: token
                            })
                        }
                    } else {
                        if (!bcrypt.checkPassword(req.body.password, user.password)) {
                            next({ message: 'email/password salah' })
                        } else {
                            let token = jwt.generateToken(user)
                            res.status(200).json({
                                access_token: token
                            })
                        }
                    }
                }
            })
    }

    static create(req, res, next) {
        const body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(body)
            .then(user => {
                let token = jwt.generateToken(user)
                res.status(200).json({
                    access_token: token
                })
            })
            .catch(next)
    }
}

module.exports = UserController