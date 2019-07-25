const AuthService = require('../../services/AuthService');

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

module.exports = {
  loginUser
};
