const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

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

//**********************************************
// 	 MIDDLEWARES start
//**********************************************

// express-session middleware
app.use(session({
  secret: 'secret session',
  resave: false,
  saveUninitialized: false
}))

//ALWAYS WRITE initialize and session AFTER app.use(session{...})
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

//**********************************************
// 	 MIDDLEWARES end
//**********************************************

// home/index route
app.get("/", (req, res) => {
  res.send("This is index/home page.")
});

// use routes
app.use(auth);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});