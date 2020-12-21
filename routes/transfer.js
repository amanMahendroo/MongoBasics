const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const Transfers = require('../models/Transfers')

// @desc    Show transfers page
// @route   GET /transfers/interface

router.get('/interface', async (req, res) => {
    const users = await Users.find().lean()
    res.render('transfers/interface', {
        users
    })
})

// @desc    Show profile
// @route   GET /profile/:id

router.get('/profile/:id', async (req, res) => {
    const user = await Users.findOne({ _id: req.params.id }).lean()
    if (!user) {
        return res.render('error/404')
    } else {
        res.render('profile', { user })
    }
})

// @desc    Process transaction
// @route   UPDATE /transfers

router.post('/', async (req, res) => {
    try {
        await Transfers.create({ from: "You", to: req.body.user, amount: req.body.amount, date: new Date() })
        // let update = await Users.findOne({ name: req.body.user })
        // Users.update({ name: req.body.user }, { balance: (~~update.balance + ~~req.body.amount) })
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router