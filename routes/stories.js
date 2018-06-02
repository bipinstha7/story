const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../helpers/auth");

// stories index
router.get("/stories", (req, res) => {
  res.render("stories/index");
});

// add story form
router.get("/stories/add", ensureAuthenticated,  (req, res) => {
  res.render("stories/add");
});


module.exports = router;