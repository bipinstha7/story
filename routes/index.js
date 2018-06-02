const express = require("express");
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

// home/index route
router.get("/", ensureGuest, (req, res) => {
  res.render("index/welcome")
});

// dashboard route
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("index/dashboard");
});

// about route
router.get("/about", (req, res) => {
  res.render("index/about");
});


module.exports = router;