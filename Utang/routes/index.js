const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');
router.get('/', function (req, res) {
    res.redirect('/credit');
})
//auth
router.get('/register', function (req, res) {
    res.render('register');
});
router.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register')
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/credit/new');
        });
    });
});
//sign up
router.get('/login', function (req, res) {
    res.render('login')
});
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'

    }), function (req, res) {
    });
//logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/')

});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}
module.exports = router