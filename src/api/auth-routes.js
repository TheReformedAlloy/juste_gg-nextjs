const express = require("express");
const passport = require("passport");

const {User} = require('../mongodb');

const router = express.Router();

router.get('/login', (req, res, next) => {
        if(!req.isAuthenticated()) return next();
        res.redirect('/profile');
    }
);

router.post('/login', passport.authenticate('local',
    { failureRedirect: '/login?has_failed=true' }),
    function(req, res) {
        res.redirect('back');
    }
);

router.post('/register', function(req, res) {
    User.register(new User({
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        username : req.body.username,
        email: req.body.email,
        admin: false
    }), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
          res.redirect('/register?already_exists=true');
        } else {
            passport.authenticate('local')(req, res, function () {
                req.session.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(201, 'back');
                    }
                });
            });
        }
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('back');
});

module.exports = router;