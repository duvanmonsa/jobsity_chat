'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = models => {
    // User.belongsToMany(models.Conversation, {
    //   through: 'Conversation',
    //   foreignKey: 'userId'
    // });
  };
  return User;
};
