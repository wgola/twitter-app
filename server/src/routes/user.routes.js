const {
  updateProfilePictureEndpoint,
  getUserDetailsEndpoint,
  getUserGeneralDataEndpoint,
  updateUserDataEndpoint,
  changeFollowingUserEndpoint,
  getUserFollowersEndpoint,
  getUserFollowingEndpoint
} = require('../controllers');

const express = require('express');

const router = express.Router();

router.put('/profilePicture', updateProfilePictureEndpoint);

router.get('/:username/details', getUserDetailsEndpoint);

router.get('/:username', getUserGeneralDataEndpoint);

router.put('/data', updateUserDataEndpoint);

router.put('/:username/follow', changeFollowingUserEndpoint);

router.get('/:username/followers', getUserFollowersEndpoint);

router.get('/:username/following', getUserFollowingEndpoint);

module.exports = router;
