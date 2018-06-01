const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("./keys");

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleCilentSecret,
    callbackURL: "/auth/google/callback",
    proxy: true // when app is deployed to the server, heroku tries to load with https. And if it can't find proxy:true - throws error
  },(accessToken, refreshToken, profile, done) => {
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);
    console.log("profile:", profile);
  }))
}