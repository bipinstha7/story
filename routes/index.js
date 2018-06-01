const express = require("express");
const router = express.Router();

// home/index route
router.get("/", (req, res) => {
  res.render("index/welcome")
});

// dashboard route
router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});


module.exports = router;