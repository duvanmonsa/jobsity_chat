'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ChatRooms',
      [
        {
          authorId: 1,
          name: 'Chat Room 1',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          authorId: 2,
          name: 'Chat Room 2',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          authorId: 3,
          name: 'Chat Room 3',
          createdAt: 'now()',
          updatedAt: 'now()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatRooms', null, {});
  }
};
