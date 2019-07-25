const Sequelize = require('sequelize');

const models = require('../../models');
const { InvalidArguments, BusinessLogicError } = require('../../utils/errors');
const errors = require('../../constants/errors');

const Op = Sequelize.Op;

const getRooms = async (req, res) => {
  const order = 'ASC';

  try {
    const rooms = await models.ChatRoom.findAll({
      order: [['id', order]],
      attributes: ['id', 'name']
    });

    res.json(rooms);
  } catch (err) {
    res.status(400).send({ error: err.message, code: 400, message: err.message });
  }
};

const getRoomMessages = async (req, res) => {
  try {
    const chatroomId = req.params.id;
    const limit = 50;
    const order = 'ASC';

    if (!chatroomId) {
      throw new InvalidArguments(errors.INVALID_CHATROOM_ID);
    }

    const messages = await models.Message.findAll({
      limit,
      where: { chatroomId },
      attributes: ['id', 'text'],
      include: [
        {
          model: models.User,
          attributes: ['name']
        }
      ],
      order: [['createdAt', order]]
    });
    if (!messages) {
      throw new BusinessLogicError(errors.NOT_FOUND_CHATROOM);
    }
    res.json(messages);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = { getRooms, getRoomMessages };
