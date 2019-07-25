const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const bcrypt = require('bcrypt');
const models = require('../models');
const { SALT_ROUNDS } = require('../constants/constants');
const errors = require('../constants/errors');

const { InvalidArguments, BusinessLogicError } = require('../utils/errors');

const validateJwt = expressJwt({
  secret: process.env.JWT_SECRET
});

const signupUser = async (user, brand) => {
  if (!user.email) {
    throw new InvalidArguments(errors.INVALID_EMAIL);
  }
  if (!user.password) {
    throw new InvalidArguments(errors.INVALID_PASSWORD);
  }

  const userExist = await models.User.findOne({ where: { email: user.email } });
  if (userExist) {
    throw new InvalidArguments(errors.FOUND_EMAIL);
  }
  const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
  user.password = hashedPassword;

  const token = await signToken(user.id);

  const data = { accessToken: token };
  return data;
};

const loginUser = async (email, password) => {
  if (!email) {
    throw new InvalidArguments(errors.INVALID_EMAIL);
  }
  if (!password) {
    throw new InvalidArguments(errors.INVALID_PASSWORD);
  }

  let user = await models.User.findOne({
    where: { email }
  });

  if (!user) {
    throw new BusinessLogicError(errors.NOT_FOUND_EMAIL);
  }

  const passValid = bcrypt.compareSync(password, user.password || '');
  if (!passValid) {
    throw new BusinessLogicError(errors.NOT_FOUND_PASSWORD);
  }

  const token = await signToken(user.id);

  const data = { accessToken: token };

  return data;
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
const isAuthenticated = () => {
  return (
    compose()
      // Validate jwt
      .use((req, res, next) => {
        // Allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use((req, res, next) => {
        models.User.findOne({
          where: { id: req.user.id },
          attributes: { exclude: ['password'] }
        })
          .then(user => {
            if (!user) {
              return res.status(401).send('Unauthorized');
            }
            req.user = user;
            req['jwt'] = signToken(user.id);
            next();
            return null;
          })
          .catch(err => {
            next(err);
          });
      })
  );
};

/**
 * Returns a jwt token signed by the app secret, token expires in 1 year
 */
const signToken = (id, role) => {
  const jwtSecret = process.env.JWT_SECRET;
  return new Promise(resolve => {
    resolve(
      jwt.sign({ id }, jwtSecret, {
        expiresIn: '' + 1000 * 60 * 60 * 24 * 365
      })
    );
  });
};

const getUserIdFromToken = async token => {
  const jwtSecret = process.env.JWT_SECRET;
  token = token.replace('Bearer ', '');
  // Verify the JWT that was passed in
  return jwt.verify(token, jwtSecret, (err, payload) => {
    if (!err) {
      return payload.id;
    }
    throw new BusinessLogicError('invalid token');
  });
};

module.exports = {
  isAuthenticated,
  signToken,
  signupUser,
  loginUser,
  getUserIdFromToken
};
