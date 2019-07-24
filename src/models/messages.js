'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      chatroomId: DataTypes.BIGINT,
      senderId: DataTypes.BIGINT,
      text: DataTypes.TEXT
    },
    {}
  );
  Message.associate = models => {
    // Message.belongsTo(models.Conversation, {
    //   foreignKey: 'conversationId'
    // });
    // Message.hasOne(models.User, {
    //   foreignKey: 'senderId'
    // });
  };
  return Message;
};
