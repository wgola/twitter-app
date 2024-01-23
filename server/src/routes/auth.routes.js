const passport = require('passport');
const express = require('express');
const { registerUserEndpoint, logoutEndpoint, getCurrentUserEndpoint } = require('../controllers');
const { authorizationMiddleware } = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/login', passport.authenticate('local'), getCurrentUserEndpoint);

router.get('/check', authorizationMiddleware, getCurrentUserEndpoint);

router.post('/register', registerUserEndpoint);

router.post('/logout', logoutEndpoint);

module.exports = router;
