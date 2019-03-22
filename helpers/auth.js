module.exports = {
	ensureAuthenticated: function(req, res, next) {
    // req.isAuthenticated in a passport middleware
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect('/')
	},

	ensureGuest: function(req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/dashboard')
		} else {
			return next()
		}
	}
}
