const express = require('express');

// Controllers
const ChatRoomController = require('./ChatRoomController');

const { isAuthenticated } = require('../../services/AuthService');
const router = express.Router();

// Users
router
  .get('/', isAuthenticated(), ChatRoomController.getRooms)
  .get('/:id/messages', isAuthenticated(), ChatRoomController.getRoomMessages);

module.exports = router;
