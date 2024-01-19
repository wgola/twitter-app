const { createUser } = require('../services');

const getCurrentUserEndpoint = (req, res) => {
  res.status(200).json(req.user);
};

const registerUserEndpoint = async (req, res) => {
  try {
    await createUser(req.body.username, req.body.password, req.body.firstname, req.body.surname);

    res.status(201).json({ message: 'User registered succesfully' });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const logoutEndpoint = (req, res) => {
  req.logout((error) => {
    if (error) {
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
  getCurrentUserEndpoint,
  registerUserEndpoint,
  logoutEndpoint
};
