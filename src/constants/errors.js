// Invalid arguments errors
const INVALID_USER = 'backend.error.arguments.user';
const INVALID_USER_ID = 'backend.error.arguments.userId';
const INVALID_EMAIL = 'backend.error.arguments.email';
const INVALID_PASSWORD = 'backend.error.arguments.password';
const INVALID_DATA = 'backend.error.arguments.data';
const INVALID_TOKEN = 'backend.error.arguments.token';
const INVALID_CONVERSATION_ID = 'backend.error.arguments.conversationId';

// Business logic errors
const FOUND_EMAIL = 'backend.error.business.email';
const NOT_FOUND_EMAIL = 'backend.error.business.noEmail';
const FOUND_USER = 'backend.error.business.user';
const NOT_FOUND_USER = 'backend.error.business.noUser';
const NOT_FOUND_HASH = 'backend.error.business.noHash';
const NOT_FOUND_CONVERSATION = 'backend.error.business.noConversation';

module.exports = {
  INVALID_USER,
  INVALID_USER_ID,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_DATA,
  INVALID_TOKEN,
  FOUND_EMAIL,
  NOT_FOUND_EMAIL,
  FOUND_USER,
  NOT_FOUND_USER,
  NOT_FOUND_HASH,
  INVALID_CONVERSATION_ID,
  NOT_FOUND_CONVERSATION
};
