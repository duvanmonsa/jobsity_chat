const models = require('../models');
const errors = require('../constants/errors');

const { InvalidArguments, BusinessLogicError } = require('../utils/errors');

const addRoomMessage = async data => {
  if (!data.chatroomId) {
    throw new InvalidArguments(errors.INVALID_CHATROOM_ID);
  }
  if (!data.text) {
    throw new InvalidArguments(errors.InvalidArguments);
  }

  if (!data.text) {
    throw new BusinessLogicError(errors.FOUND_USER);
  }
  const newMessage = await models.Message.create(data);
  return await models.Message.findByPk(newMessage.id, {
    include: [
      {
        model: models.User,
        attributes: ['name']
      }
    ]
  });
};

module.exports = {
  addRoomMessage
};
