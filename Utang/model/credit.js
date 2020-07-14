const { Model } = require("mongoose")

const mongoose = require('mongoose')
const creditSchema = mongoose.Schema({
    credit: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    }
})
const Credits = mongoose.model('Credit', creditSchema)
module.exports = Credits