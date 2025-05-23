const express = require('express');
const route = express.Router();
const authController = require('./src/controllers/authController');


route.get('/', (req, res) => {
    res.send('Organizer Events');
})

//Routes to auth
route.get('/register', authController.register);
route.get('/login', authController.login);

module.exports = route;