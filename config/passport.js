const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("./keys");
// load user model
const User = require("../models/Users");

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleCilentSecret,
    callbackURL: "/auth/google/callback",
    proxy: true // when app is deployed to the server, heroku tries to load with https. And if it can't find proxy:true - throws error
  }, (accessToken, refreshToken, profile, done) => {
    // console.log("accessToken:", accessToken);
    // console.log("profile:", profile);

    const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf("?"));
    
    const newUser = {
      googleID: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      image: image
    }

    //check for existing user
    User.findOne({googleID: profile.id})
      .then(user => {
        if(user) {
          // return user
          done(null, user);
        } else {
          // create user
          User.create(newUser)
            .then(user => done(null, user))
            .catch(err => console.log("Something is wrong on creating new user: ", err));
        }
      })
      .catch(err => console.log("Somethig gone wrong: User.findOne({googleID: profile.id}): ", err));

  }))
}