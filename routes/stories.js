const express = require("express");
const router = express.Router();

const {ensureAuthenticated} = require("../helpers/auth");
const Story = require("../models/Story");

// stories index
router.get("/stories", (req, res) => {
  Story.find({status: "public"})
    .populate("user")
    .then(stories => {
      res.render("stories/index", {stories: stories});
    })
    .catch(err => console.log("Error on fetching stories from the database: /stories", err));
});

// show single story 
router.get("/stories/show/:id", (req, res) => {
  Story.findOne({_id: req.params.id})
    .populate("user")
    .then(story => {
      res.render("stories/show", {story: story});
    })
    .catch(err => console.log("Error on finding story: /stories/show/:id", err));
});


// add story form
router.get("/stories/add", ensureAuthenticated,  (req, res) => {
  res.render("stories/add");
});

// process add story: POST
router.post("/stories", ensureAuthenticated,  (req, res) => {
  let allowComments;

  if(req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    status: req.body.status,
    allowComments: allowComments,
    body: req.body.textarea,
    user: req.user._id,
  }

  Story.create(newStory)
    .then(story => {
      res.redirect(`/stories/show/${story._id}`)
    })
    .catch(err => console.log("Error creating story:", err));

});

// Edit story form
router.get("/stories/edit/:id", ensureAuthenticated,  (req, res) => {
  Story.findOne({_id: req.params.id})
    .then(story => {
      res.render("stories/edit", {story: story});
    })
    .catch(err => console.log("Error on finding edit story form: /stories/edit/:id", err));
});

// Edit form process: PUT


module.exports = router;