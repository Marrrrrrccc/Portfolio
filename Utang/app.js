const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = require('passport-local-mongoose');
const expressSession = require('express-session');
const Credits = require('./model/credit');
const User = require('./model/user');
const Profile = require('./model/profile')
const indexRoutes = require('./routes/index');
const creditRoute = require('./routes/credit');
const profileRoute = require('./routes/profile');








mongoose.connect("mongodb://localhost:27017/credit", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession(
    {
        secret: "Marc",
        resave: false,
        saveUninitialized: false,
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
app.use(indexRoutes);
app.use(creditRoute);
app.use(profileRoute);














app.listen(3000, function () {
    console.log("listening");
});