'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
    {
      senderId: DataTypes.BIGINT,
      recipientId: DataTypes.BIGINT
    },
    {}
  );

  Conversation.associate = models => {
    // Conversation.belongsToMany(models.Message, {
    //   foreignKey: 'conversationId'
    // });
  };

  return Conversation;
};
