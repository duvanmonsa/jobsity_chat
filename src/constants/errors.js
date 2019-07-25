// Invalid arguments errors
const INVALID_EMAIL = 'backend.error.arguments.email';
const INVALID_PASSWORD = 'backend.error.arguments.password';
const INVALID_CHATROOM_ID = 'backend.error.arguments.chatroomId';

// Business logic errors
const NOT_FOUND_EMAIL = 'backend.error.business.noEmail';
const FOUND_USER = 'backend.error.business.user';
const NOT_FOUND_CHATROOM = 'backend.error.business.noChatroom';

module.exports = {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  NOT_FOUND_EMAIL,
  FOUND_USER,
  INVALID_CHATROOM_ID,
  NOT_FOUND_CHATROOM
};
