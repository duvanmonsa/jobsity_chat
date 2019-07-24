const express = require('express');
const { isAuthenticated } = require('../../services/AuthService');
const UserController = require('./UserController');
const router = express.Router();

router.get('/me', isAuthenticated(), UserController.me);

module.exports = router;
