'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const hashedPassword = bcrypt.hashSync('123456', SALT_ROUNDS);
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Duvan',
          email: 'test@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Carlos',
          email: 'test2@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Jhon',
          email: 'test3@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Daniela',
          email: 'test4@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Cristian',
          email: 'test5@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
