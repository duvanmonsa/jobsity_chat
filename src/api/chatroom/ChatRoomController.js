const Sequelize = require('sequelize');

const models = require('../../models');
const { InvalidArguments, BusinessLogicError } = require('../../utils/errors');
const errors = require('../../constants/errors');

const Op = Sequelize.Op;

const getRooms = async (req, res) => {
  const userId = req.user.id;
  const limit = 50;
  const order = 'ASC';

  try {
    const conversations = await models.Conversation.findAll({
      limit,
      order: [['id', order]],
      where: { [Op.or]: [{ senderId: userId }, { recipientId: userId }] }
    });

    res.json(conversations);
  } catch (err) {
    res.status(400).send({ error: err.message, code: 400, message: err.message });
  }
};

const getRoomMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;

    if (!conversationId) {
      throw new InvalidArguments(errors.INVALID_CONVERSATION_ID);
    }

    const conversation = await models.Conversation.findByPk(userId);
    if (!conversation) {
      throw new BusinessLogicError(errors.NOT_FOUND_CONVERSATION);
    }
    res.json(conversation);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = { getRooms, getRoomMessages };
