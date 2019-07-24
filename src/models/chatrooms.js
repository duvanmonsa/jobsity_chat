'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    'ChatRoom',
    {
      authorId: DataTypes.BIGINT,
      name: DataTypes.STRING
    },
    {}
  );

  ChatRoom.associate = models => {
    // Conversation.belongsToMany(models.Message, {
    //   foreignKey: 'conversationId'
    // });
  };

  return ChatRoom;
};
