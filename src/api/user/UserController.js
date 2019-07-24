const me = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).send({ error: err.message, code: 400, message: err.message });
  }
};

module.exports = { me };
