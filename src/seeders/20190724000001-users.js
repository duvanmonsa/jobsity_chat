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
          email: 'duvanmonsa@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Carlos',
          email: 'duvanmonsa2@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'David',
          email: 'duvanmonsa3@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Daniela',
          email: 'duvanmonsa4@gmail.com',
          password: hashedPassword,
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Cristian',
          email: 'duvanmonsa5@gmail.com',
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
