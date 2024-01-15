const passport = require('passport');
const express = require('express');
const { afterLoginEndpoint, registerUserEndpoint, logoutEndpoint } = require('../controllers');

const router = express.Router();

router.post('/login', passport.authenticate('local'), afterLoginEndpoint);

router.post('/register', registerUserEndpoint);

router.post('/logout', logoutEndpoint);

module.exports = router;
