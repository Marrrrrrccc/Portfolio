const express = require('express');
const Profile = require('../model/profile');
const Credits = require('../model/credit');
const router = express.Router();

router.get("/credit/:id/add", isLoggedIn, function (req, res) {
    Profile.findById(req.params.id, function (err, add) {
        if (err) {
            console.log(err);
        } else {
            res.render('create', { add: add });
        }
    })
})
router.post("/credit/:id/adder", isLoggedIn, function (req, res) {
    Profile.findById(req.params.id, function (err, find) {
        if (err) {
            console.log(err);
        } else {
            Credits.create(req.body.credit, function (err, add) {
                if (err) {
                    console.log(err);
                } else {
                    add.author.id = req.user._id;
                    add.author.username = req.user.username;
                    add.save();
                    find.credits.push(add)
                    find.save();
                    res.redirect("/credit/" + find._id)

                }
            })

        }

    }
    )
})
router.delete('/credit/:id/credits', isLoggedIn, function (req, res) {
    Profile.findById(req.params.id, function (err, foundProfile) {
        if (err) {
            console.log(err);
        } else {
            Credits.findByIdAndDelete(req.params.id, req.body.credit, function (err, deleteProfile) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/')
                }
            })
        }
    })
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}
module.exports = router