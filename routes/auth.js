const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
	// Successful authentication
	res.redirect('/dashboard')
})

router.get('/auth/verify', (req, res) => {
	if (req.user) {
		console.log(req.user)
	} else {
		console.log('Not authorized')
	}
})

router.get('/auth/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

module.exports = router
