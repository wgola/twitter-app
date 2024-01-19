const {
  updateProfilePicture,
  getUserDetails,
  getUserGeneralData,
  updateUserData,
  changeFollowingUser,
  getUserFollowers
} = require('../services');

const updateProfilePictureEndpoint = async (req, res) => {
  try {
    const updatedProfilePicture = await updateProfilePicture(
      req.user._id,
      req.files.profilePicture
    );

    res.status(201).json(updatedProfilePicture);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const getUserDetailsEndpoint = async (req, res) => {
  try {
    const foundUser = await getUserDetails(req.user.username, req.params.username);

    res.json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserGeneralDataEndpoint = async (req, res) => {
  try {
    const foundUser = await getUserGeneralData(req.params.username);

    res.json(foundUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUserDataEndpoint = async (req, res) => {
  try {
    await updateUserData(req.user._id, req.body);

    res.sendStatus(201);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const changeFollowingUserEndpoint = async (req, res) => {
  try {
    await changeFollowingUser(req.user._id, req.params.username);

    res.sendStatus(201);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const getUserFollowersEndpoint = async (req, res) => {
  try {
    const foundFollowers = await getUserFollowers(
      req.params.username,
      req.query.page,
      req.query.limit
    );

    res.status(200).json(foundFollowers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  updateProfilePictureEndpoint,
  getUserDetailsEndpoint,
  getUserGeneralDataEndpoint,
  updateUserDataEndpoint,
  changeFollowingUserEndpoint,
  getUserFollowersEndpoint
};
