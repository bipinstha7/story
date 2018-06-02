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
    .populate("user") // populate to those schemas which is refered as type: Schema.Types.ObjectId
    .populate("comments.commentUser")
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
router.put("/stories/:id", ensureAuthenticated, (req, res) => {
  let allowComments;

  if(req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const editedStory = {
    title: req.body.title,
    status: req.body.status,
    allowComments: allowComments,
    body: req.body.textarea
  }

  Story.findByIdAndUpdate(req.params.id, editedStory)
    .then(story => {
      res.redirect("/dashboard");
    })
    .catch(err => {
			res.status(500).send(err);
			console.log("put: /stories/:id-", err);
		});
});

// delete story
router.delete("/stories/:id", ensureAuthenticated, (req, res) => {
  Story.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/dashboard"))
    .catch(err => {
			res.status(500).send(err);
			console.log("delete: /stories/:id", err);
		});
});

// add comment process: POST
router.post("/stories/comment/:id", (req, res) => {
  Story.findById(req.params.id)
    .then(story => {
      const newComment = {
        commentBody: req.body.commentBody,
        commentUser: req.user._id
      }

      // Add to comments array
      story.comments.unshift(newComment);
      story.save()
        .then(story => {
          res.redirect(`/stories/show/${story._id}`);
        })

    })
});



module.exports = router;