'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CONSUMER_KEY,
  clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback'
},
(token, tokenSecret, profile, done) => {
  done(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const googleApiScope = ['profile'];

module.exports = app => {
  app.use(require('cookie-parser')());
  app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true 
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', { scope: googleApiScope }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    });
};
