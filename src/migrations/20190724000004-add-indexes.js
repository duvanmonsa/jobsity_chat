'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Users', ['id']);
    await queryInterface.addIndex('Users', ['email']);
    await queryInterface.addIndex('Conversations', ['id']);
    await queryInterface.addIndex('Conversations', ['senderId']);
    await queryInterface.addIndex('Conversations', ['recipientId']);
    await queryInterface.addIndex('Messages', ['id']);
    await queryInterface.addIndex('Messages', ['senderId']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Users', ['id']);
    await queryInterface.removeIndex('Users', ['email']);
    await queryInterface.removeIndex('Conversation', ['id']);
    await queryInterface.removeIndex('Conversation', ['senderId']);
    await queryInterface.removeIndex('Conversation', ['recipientId']);
    await queryInterface.removeIndex('Message', ['id']);
    await queryInterface.removeIndex('Message', ['senderId']);
  }
};
