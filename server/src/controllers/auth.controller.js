const { createUser } = require('../services');

const afterLoginEndpoint = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    firstname: req.user.firstname,
    surname: req.user.surname
  });
};

const registerUserEndpoint = async (req, res) => {
  try {
    await createUser(req.body.username, req.body.password, req.body.firstname, req.body.lastname);

    res.status(201).json({ message: 'User registered succesfully' });
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

const logoutEndpoint = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.status(200).clearCookie('connect.sid');
      req.session.destroy(() => {
        res.json({ message: 'Logged out successfully' });
      });
    }
  });
};

module.exports = {
  afterLoginEndpoint,
  registerUserEndpoint,
  logoutEndpoint
};
