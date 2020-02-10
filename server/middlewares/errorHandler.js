"use strict"

function errorHandler(err, req, res, next) {
    console.log(err.message)
    res.status(500).json(err.message)
}

module.exports = errorHandler