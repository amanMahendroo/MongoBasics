const express = require('express')
const Users = require('../models/User')
const Transfers = require('../models/Transfers')
const router = express.Router()

// @desc    Dashboard
// @route   GET /

router.get('/', async (req, res) => {
    try {
        const users = await Users.find().lean()
        const transfers = await Transfers.find().sort( { date: -1 } ).lean()
        res.render('dashboard', {
            users, transfers
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

// @desc    Users
// @route   GET /users

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find().lean()
        res.render('users', {
            users
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

module.exports = router