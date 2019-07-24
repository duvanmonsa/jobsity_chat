'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Messages',
      [
        {
          chatroomId: 1,
          senderId: 4,
          text: 'Hello',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          chatroomId: 1,
          senderId: 1,
          text: 'How are you?',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          chatroomId: 1,
          senderId: 4,
          text: 'All good!',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          chatroomId: 1,
          senderId: 3,
          text: 'Hey everyone',
          createdAt: 'now()',
          updatedAt: 'now()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
