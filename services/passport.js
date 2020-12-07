const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//IMPORTANT - see server.js, must instantiate/require models BEFORE passport
const User = mongoose.model('users');

//user.id is NOT googleId, it is MongoDB ._id
passport.serializeUser((user, done) => {
    //user.id added to cookie
    done(null, user.id);
});

//search db with MongoDB id
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {

    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
    }

    try {
        let user = await User.findOne({ googleId: profile.id })

        if (user) {
            done(null, user)
        } else {
            user = await User.create(newUser)
            done(null, user)
        }
    } catch (err) {
        console.error(err)
    }

})
);