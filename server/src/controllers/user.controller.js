const {
  updateProfilePicture,
  getUserDetails,
  getUserGeneralData,
  updateUserData,
  getUserFollowers,
  getUserFollowing,
  getUserPosts,
  getUserLikes
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

const getUserPostsEndpoint = async (req, res) => {
  try {
    const foundPosts = await getUserPosts(
      req.params.username,
      req.query.page,
      req.query.limit,
      req.query.timestamp
    );

    res.status(200).json(foundPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserLikesEndpoint = async (req, res) => {
  try {
    const likedPosts = await getUserLikes(
      req.params.username,
      req.query.page,
      req.query.limit,
      req.query.timestamp
    );

    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserDetailsEndpoint = async (req, res) => {
  try {
    const foundUser = await getUserDetails(req.params.username);

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

const getUserFollowingEndpoint = async (req, res) => {
  try {
    const foundFollowings = await getUserFollowing(
      req.params.username,
      req.query.page,
      req.query.limit
    );

    res.status(200).json(foundFollowings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  updateProfilePictureEndpoint,
  getUserDetailsEndpoint,
  getUserGeneralDataEndpoint,
  updateUserDataEndpoint,
  getUserFollowersEndpoint,
  getUserFollowingEndpoint,
  getUserLikesEndpoint,
  getUserPostsEndpoint
};
