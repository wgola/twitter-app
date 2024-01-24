const express = require('express');
const {
  updateProfilePictureEndpoint,
  getUserDetailsEndpoint,
  getUserGeneralDataEndpoint,
  updateUserDataEndpoint,
  getUserFollowersEndpoint,
  getUserFollowingEndpoint,
  getUserPostsEndpoint,
  getUserLikesEndpoint,
  searchUsersEndpoints
} = require('../controllers');

const router = express.Router();

router.put('/profilePicture', updateProfilePictureEndpoint);

router.get('/:username/details', getUserDetailsEndpoint);

router.get('/:username', getUserGeneralDataEndpoint);

router.put('/data', updateUserDataEndpoint);

router.get('/', searchUsersEndpoints);

router.get('/:username/followers', getUserFollowersEndpoint);

router.get('/:username/following', getUserFollowingEndpoint);

router.get('/:username/posts', getUserPostsEndpoint);

router.get('/:username/likes', getUserLikesEndpoint);

module.exports = router;
