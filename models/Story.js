const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: public
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      type: String,
      require: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    commentUser: {
      type: Schema.types.ObjectId,
      ref: "User"
    }
  }],
  user: {
    type: Schema.types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Story", StorySchema, "stories"); 
// 3rd options stories forces mongoose to store story name as stories but not storys