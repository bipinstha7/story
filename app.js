const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

// passport config
require("./config/passport")(passport);
// load routes 
const auth = require("./routes/auth");
// load keys
const keys = require("./config/keys");

// mongoose connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log("mongodb/mlab connected"))
  .catch(err => console.log("Error on connecting mongodb/mlab:", err));


// home/index route
app.get("/", (req, res) => {
  res.send("This is index/home page.")
});

// use routes
app.use(auth);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port} `);
});