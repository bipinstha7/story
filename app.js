const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

// passport config
require("./config/passport")(passport);

// load routes 
const auth = require("./routes/auth");
const index = require("./routes/index");
const stories = require("./routes/stories");

// load keys
const keys = require("./config/keys");

// handlebars helper
const {truncate, stripTags, formatDate, select, editIcon} = require("./helpers/hbs");

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
app.engine("handlebars", exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select,
    editIcon: editIcon
  },
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// set static folder
app.use(express.static(__dirname + "/public"));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride("_method"));

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