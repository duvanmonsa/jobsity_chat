'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Users', ['id']);
    await queryInterface.addIndex('Users', ['email']);
    await queryInterface.addIndex('ChatRooms', ['id']);
    await queryInterface.addIndex('ChatRooms', ['authorId']);
    await queryInterface.addIndex('Messages', ['id']);
    await queryInterface.addIndex('Messages', ['senderId']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Users', ['id']);
    await queryInterface.removeIndex('Users', ['email']);
    await queryInterface.removeIndex('ChatRooms', ['id']);
    await queryInterface.removeIndex('ChatRooms', ['authorId']);
    await queryInterface.removeIndex('Message', ['id']);
    await queryInterface.removeIndex('Message', ['senderId']);
  }
};
