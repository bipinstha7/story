const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();

// passport config
require("./config/passport")(passport);

// load routes 
const auth = require("./routes/auth");
const index = require("./routes/index");
const stories = require("./routes/stories");

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

// handlebars middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// set static folder
app.use(express.static(__dirname + "/public"));

//**********************************************
// 	 MIDDLEWARES end
//**********************************************


// use routes
app.use(auth);
app.use(index);
app.use(stories);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});