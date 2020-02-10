"use strict"

const { Comic } = require('../models')

class ComicController {
    static findAll(req, res, next) {
        Comic.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Comic.findByPk(req.params.id)
            .then(comic => {
                if (!comic) {
                    next({ message: 'comic not found' })
                } else {
                    res.status(200).json(comic)
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        const body = {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.image
        }
        Comic.update(body, { where: { id: req.params.id } })
            .then(data => {
                res.json(200).json({
                    comic: data,
                    message: `success update comic`
                })
            })
            .catch(next)
    }
}

module.exports = ComicController