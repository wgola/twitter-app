const bcrypt = require('bcrypt');
const { User } = require('../models');
const { saveFile, deleteFile } = require('./storage.service');

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
  } catch (err) {
    throw new Error('Error creating user: ' + err);
  }
};

const getUserDetails = async (currentUserUsername, username) => {
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
        isFollowed: { $in: [currentUserUsername, '$followers.username'] }
      }
    }
  ]);

  if (foundUser.length !== 1) {
    throw new Error('User not found!');
  }

  return foundUser[0];
};

const getUserGeneralData = async (username) => {
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
    throw new Error('User not found!');
  }

  return foundUser[0];
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
    console.log(error);
    throw new Error(error);
  }
};

const updateUserData = async (userId, userData) => {
  try {
    console.log(userId);
    console.log(userData);
    await User.findByIdAndUpdate(userId, userData);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

const changeFollowingUser = async (userId, username) => {
  try {
    const [{ isFollowed }] = await User.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          isFollowed: { $in: [username, '$follows'] }
        }
      }
    ]);

    if (isFollowed) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          follows: username
        }
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: {
          follows: username
        }
      });
    }
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  updateProfilePicture,
  getUserDetails,
  getUserGeneralData,
  updateUserData,
  changeFollowingUser,
  getUserFollowers
};
