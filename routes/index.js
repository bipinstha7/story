const express = require('express')
const router = express.Router()

const { ensureAuthenticated, ensureGuest } = require('../helpers/auth')
const Story = require('../models/Story')

// home/index route
router.get('/', ensureGuest, (req, res) => {
	res.render('index/welcome')
})

// dashboard route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
	Story.find({ user: req.user._id })
		.then(stories => {
			res.render('index/dashboard', { stories: stories })
		})
		.catch(err => console.log('Error finding dashboard stories: /dashboard', err))
})

// about route
router.get('/about', (req, res) => {
	res.render('index/about')
})

module.exports = router
