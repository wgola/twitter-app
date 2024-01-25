const bcrypt = require('bcryptjs');
const { saveFile, deleteFile } = require('./storage.service');
const { User } = require('../models');
const { LOG } = require('../config');

const createUser = async (username, password, firstname, surname) => {
  try {
    const user = {
      username,
      password: bcrypt.hashSync(password, 8),
      firstname,
      surname
    };

    const createdUser = await User.create(user);

    return createdUser;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getUserDetails = async (username) => {
  try {
    const foundUser = await User.aggregate([
      {
        $match: { username }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'username',
          foreignField: 'follows',
          as: 'followers'
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          surname: 1,
          description: 1,
          joinedAt: '$createdAt',
          profilePictureUrl: '$profilePicture.url',
          followingCount: { $size: '$follows' },
          followersCount: { $size: '$followers' },
          follows: 1
        }
      }
    ]);

    if (foundUser.length !== 1) {
      LOG.error(`User '${username}' not found`);

      throw new Error(`User '${username}' not found`);
    }

    return foundUser[0];
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error finding user '${username}': ${error.message}`);
  }
};

const getUserGeneralData = async (username) => {
  try {
    const foundUser = await User.aggregate([
      {
        $match: { username }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          surname: 1,
          profilePictureUrl: '$profilePicture.url'
        }
      }
    ]);

    if (foundUser.length !== 1) {
      LOG.error(`User '${username}' not found`);

      throw new Error(`User '${username}' not found`);
    }

    return foundUser[0];
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error finding user '${username}': '${error.message}'`);
  }
};

const searchUsers = async (username, page, limit) => {
  try {
    const searchUsersAggregation = User.aggregate([
      {
        $match: { username: new RegExp(username) }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          firstname: 1,
          surname: 1,
          profilePictureUrl: '$profilePicture.url'
        }
      }
    ]);

    return await User.aggregatePaginate(searchUsersAggregation, {
      page: page,
      limit: limit
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error finding user '${username}': '${error.message}'`);
  }
};

const updateProfilePicture = async (userId, profilePicture) => {
  try {
    const foundUser = await User.findById(userId);

    if (foundUser.profilePicture.id !== null) {
      await deleteFile(foundUser.profilePicture.id);
    }

    const { id, url } = await saveFile(profilePicture, userId, 'profilePictures');

    await User.findByIdAndUpdate(userId, {
      profilePicture: {
        url,
        id
      }
    });

    return url;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error updating profile picture: ${error.message}`);
  }
};

const updateUserData = async (userId, userData) => {
  try {
    await User.findByIdAndUpdate(userId, userData);

    return true;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error updating user data: ${error.message}`);
  }
};

const followUser = async (userId, username) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        follows: username
      }
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error following user: ${error.message}`);
  }
};

const unfollowUser = async (userId, username) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: {
        follows: username
      }
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error unfollowing user: ${error.message}`);
  }
};

const getUserFollowers = async (username, page, limit) => {
  try {
    const followersAggregate = User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: 'users',
          localField: 'username',
          foreignField: 'follows',
          as: 'followers'
        }
      },
      {
        $unwind: '$followers'
      },
      {
        $project: {
          _id: '$followers._id',
          username: '$followers.username',
          firstname: '$followers.firstname',
          surname: '$followers.surname',
          profilePictureUrl: '$followers.profilePicture.url'
        }
      }
    ]);

    return await User.aggregatePaginate(followersAggregate, {
      page: page,
      limit: limit
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting user followers: ${error.message}`);
  }
};

const getUserFollowing = async (username, page, limit) => {
  try {
    const followingAggregate = User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: 'users',
          localField: 'follows',
          foreignField: 'username',
          as: 'following'
        }
      },
      {
        $unwind: '$following'
      },
      {
        $project: {
          _id: '$following._id',
          username: '$following.username',
          firstname: '$following.firstname',
          surname: '$following.surname',
          profilePictureUrl: '$following.profilePicture.url'
        }
      }
    ]);

    return await User.aggregatePaginate(followingAggregate, {
      page: page,
      limit: limit
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting user followings: ${error.message}`);
  }
};

module.exports = {
  createUser,
  updateProfilePicture,
  getUserDetails,
  getUserGeneralData,
  updateUserData,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
  searchUsers
};
