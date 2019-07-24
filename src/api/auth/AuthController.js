const crypto = require('crypto');

const AuthService = require('../../services/AuthService');
const models = require('../../models');
const errors = require('../../constants/errors');

const generateRandomHash = () => {
  const currentDate = new Date().valueOf().toString();
  const random = Math.random().toString();
  return crypto
    .createHash('sha1')
    .update(currentDate + random)
    .digest('hex');
};

const signupUser = async (req, res) => {
  try {
    const user = req.body.user;
    let brand = req.body.brand;
    if (!brand) {
      brand = null;
    }
    const token = await AuthService.signupUser(user, brand);
    res.json(token);
  } catch (err) {
    if (err.code && err.code === 11000) {
      res.status(400).send({ error: errors.FOUND_USER });
    } else {
      const msg = err.errmsg ? err.errmsg : err.message ? err.message : '';

      if (msg) {
        res.status(400).send({ error: msg });
      } else {
        res.status(400).send({ error: err });
      }
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    const token = await AuthService.loginUser(email, pass);
    res.json(token);
  } catch (err) {
    const msg = err.errmsg ? err.errmsg : err.message ? err.message : '';

    if (msg) {
      res.status(400).send({ error: msg });
    } else {
      res.status(400).send({ error: err });
    }
  }
};

const createExchangeToken = async (userId, admin = false) => {
  const randomHash = generateRandomHash();
  const accessToken = await AuthService.signToken(userId);

  const ex = await models.ExchangeToken.create({ code: randomHash, accessToken: accessToken });
  if (admin) {
    return `${process.env.URL_PROTOCOL}${process.env.ADMIN_URL}/redirect?code=${ex.code}`;
  }
  return `${process.env.URL_PROTOCOL}${process.env.SITE_URL}/redirect?code=${ex.code}`;
};

const exchangeToken = async (req, res) => {
  try {
    if (!req.body.code) {
      res.status(400).send({
        error: errors.INVALID_TOKEN,
        code: 10002,
        message: errors.INVALID_TOKEN
      });
      return;
    }

    const etd = await models.ExchangeToken.findOne({ where: { code: req.body.code } });
    if (!etd) {
      res.status(400).send({
        error: 'The code ' + req.body.code + ' is invalid, please signup again',
        code: 10002,
        message: 'The code ' + req.body.code + ' is invalid, please signup again'
      });
      return;
    }

    etd.destroy();
    res.status(200).send({ token: etd.accessToken });
  } catch (err) {
    res.status(400).send({ error: errors.UNEXPECTED_ERROR });
  }
};

module.exports = {
  exchangeToken,
  createExchangeToken,
  loginUser,
  signupUser,
  generateRandomHash
};
