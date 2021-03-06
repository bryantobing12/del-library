const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware
const { auth, notAuth, authRoleLibrarian } = require('../middleware/auth');

// Models
const Users = require('../models/users');

const initializePassport = require('../middleware/passport-config');
initializePassport (passport);

router.get('/login', notAuth, (req, res) => {
    res.render('pages/login', {
        title : "Login - OLIS ITDEL"
    });
});

router.get('/register', notAuth,  (req,res) => {
    res.render('pages/register');
});

router.post('/register', notAuth, async (req,res) => {
    const user = new Users(req.body);
    try {
        await user.save();
        res.redirect('/user/login');
    } catch (e) {
        res.redirect('/user/register');
    }
});

router.post('/login', notAuth, passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    successFlash : true,
    failureRedirect: '/user/login',
    failureFlash: true,
}));

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/user/login');
});

// ----------------- DASHBOARD -------------------- //
router.get('/dashboard', auth, (req, res) => {
    res.render('pages/dashboard', {
        title : "Dashboard",
        name : req.user.fullname,
        user : req.user
    });
});

router.get('/profil', auth, (req, res) => {
    res.render('pages/userprofil', {
        title : "Profil",
        user : req.user
    });
});

router.get('/addmedia-menu', auth, authRoleLibrarian, (req, res) => {
    res.render('pages/addmediamenu', {
        title : "Add Media Menu",
    })
}); 

module.exports = router;