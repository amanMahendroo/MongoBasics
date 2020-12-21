const mongoose = require('mongoose')
const User = require('../models/User')

const TransferSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Transfer', TransferSchema)