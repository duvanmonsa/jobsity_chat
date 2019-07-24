const express = require('express');
const AuthController = require('./AuthController');

const router = express.Router();

router
  .post('/token', AuthController.exchangeToken)
  .post('/signup', AuthController.signupUser)
  .post('/login', AuthController.loginUser);

module.exports = router;
