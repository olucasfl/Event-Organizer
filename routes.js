const express = require('express');
const router = express.Router();
const authController = require('./src/controllers/authController');

// Home route
router.get('/', (req, res) => {
    res.render('index');
});

// Auth routes
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

router.get('/events', (req, res) => {
    res.render('events');
});

module.exports = router;