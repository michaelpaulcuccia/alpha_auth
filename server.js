const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
//IMPORTANT - see passport.js - must instantiate/require models BEFORE passport

const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected')
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
};

connectDB();

const app = express();

//enable express to use cookies
app.use(
    cookieSession({
        //seven days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});