const express = require('express');

// Controllers
const ConversationController = require('./ConversationController');

const { isAuthenticated } = require('../../services/AuthService');
const router = express.Router();

// Users
router
  .get('/', isAuthenticated(), ConversationController.getConversations)
  .get('/:id', isAuthenticated(), ConversationController.getConversation);
// .post('/:id/message', isAuthenticated(), ConversationController.createMessage)

module.exports = router;
