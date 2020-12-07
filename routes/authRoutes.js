const passport = require('passport');

module.exports = (app) => {

    //login
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //callback
    app.get('/auth/google/callback',
        passport.authenticate('google')

    );

    //get access to user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

}