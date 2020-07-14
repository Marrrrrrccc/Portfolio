const express = require('express');
const Profile = require('../model/profile');
const router = express.Router();
router.get('/credit', function (req, res) {
    Profile.find({}, function (err, foundUtang) {
        if (err) {
            console.log(err);
        } else {
            res.render("index",
                {
                    foundUtang: foundUtang,

                })
        }
    });
});

router.get('/credit/new', isLoggedIn, function (req, res) {
    res.render('new')
})
router.post('/credit', isLoggedIn, function (req, res) {
    Profile.create(req.body.profile, function (err, addNewProfile) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})
router.get('/credit/:id', function (req, res) {
    const result = 0;
    Profile.findById(req.params.id).populate("credits").exec(function (err, foundProfile) {
        if (err) {
            console.log(err);
        } else {
            res.render('show',
                {
                    foundProfile: foundProfile,

                    result: result,
                });


        }
    })
})
router.get('/credit/:id/edit', isLoggedIn, function (req, res) {
    Profile.findById(req.params.id, function (err, edit) {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', { edit: edit })
        }
    })
});
router.put('/credit/:id', isLoggedIn, function (req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body.profile, function (err, update) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/credit/" + req.params.id)
        }
    })
})
router.delete('/credit/:id', isLoggedIn, function (req, res) {
    Profile.findByIdAndDelete(req.params.id, req.body.profile, function (err, deleteCredit) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }

    })
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
}
module.exports = router;