const { LOG, io } = require('../config');
const { Post, FormattedPost, User } = require('../models');
const {
  Types: { ObjectId }
} = require('mongoose');

const getPosts = async (page, limit, timestamp, fetchNew) => {
  try {
    if (fetchNew) {
      const postsAggregation = await FormattedPost.paginate(
        { createdAt: { $gt: timestamp }, isDeleted: false },
        { page, limit, sort: { createdAt: 1 } }
      );

      return postsAggregation;
    }

    const postsAggregation = await FormattedPost.paginate(
      { createdAt: { $lt: timestamp }, isDeleted: false },
      { page, limit }
    );

    return postsAggregation;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting posts: ${error.message}`);
  }
};

const getFollowsPosts = async (username, page, limit, timestamp, fetchNew) => {
  try {
    const { follows } = await User.findOne({ username });

    if (fetchNew) {
      const postsAggregation = await FormattedPost.paginate(
        {
          'author.username': { $in: follows },
          createdAt: { $gt: timestamp },
          isDeleted: false
        },
        { page, limit, sort: { createdAt: 1 } }
      );

      return postsAggregation;
    }

    const postsAggregation = await FormattedPost.paginate(
      {
        'author.username': { $in: follows },
        createdAt: { $lt: +timestamp, $gt: +timestamp - 1000 * 60 * 60 * 48 },
        isDeleted: false
      },
      { page, limit }
    );

    return postsAggregation;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting posts: ${error.message}`);
  }
};

const getPostById = async (postId) => {
  try {
    const foundPost = await FormattedPost.findById(postId);

    return foundPost;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting post by ID: ${error.message}`);
  }
};

const getUserPosts = async (username, page, limit, timestamp) => {
  try {
    const postsAggregation = await FormattedPost.paginate(
      { 'author.username': username, createdAt: { $lt: timestamp }, isDeleted: false },
      { page, limit }
    );

    return postsAggregation;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting posts: ${error.message}`);
  }
};

const getUserLikes = async (username, page, limit, timestamp) => {
  try {
    const postsAggregation = await FormattedPost.paginate(
      { likes: username, createdAt: { $lt: timestamp }, isDeleted: false },
      { page, limit }
    );

    return postsAggregation;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting posts: ${error.message}`);
  }
};

const getPostComments = async (postId, page, limit, timestamp, fetchNew) => {
  try {
    if (fetchNew) {
      const postComments = await FormattedPost.paginate(
        { parentPostId: postId, createdAt: { $gt: timestamp }, isDeleted: false },
        { page, limit, sort: { createdAt: 1 } }
      );

      return postComments;
    }

    const postComments = await FormattedPost.paginate(
      { parentPostId: postId, createdAt: { $lt: timestamp }, isDeleted: false },
      { page, limit }
    );

    return postComments;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting post comments: ${error.message}`);
  }
};

const createPost = async (author, post) => {
  try {
    const postToCreate = {
      authorUsername: author,
      parentPostId: post.parentPostId,
      quotedPostId: post.quotedPostId,
      content: {
        original: post.content
      }
    };

    const createdPost = await Post.create(postToCreate);

    const formattedCreatedPost = await FormattedPost.findById(createdPost._id);

    if (postToCreate.parentPostId) {
      io.to(postToCreate.parentPostId)
        .except(postToCreate.authorUsername)
        .emit('new-comment', postToCreate.authorUsername);
    }

    io.to('main-page')
      .except(postToCreate.authorUsername)
      .emit('new-post', postToCreate.authorUsername);

    return formattedCreatedPost;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error creating post: ${error.message}`);
  }
};

const editPost = async (author, postId, newContent) => {
  try {
    const editedPost = await Post.findOneAndUpdate(
      { authorUsername: author, _id: postId },
      {
        $set: {
          'content.edited': newContent,
          contentEditedAt: new Date()
        }
      }
    );

    const formattedEditedPost = await FormattedPost.findById(editedPost._id);

    return formattedEditedPost;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error editing post: ${error.message}`);
  }
};

const likePost = async (postId, username) => {
  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: username
      }
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error liking post: ${error.message}`);
  }
};

const dislikePost = async (postId, username) => {
  try {
    await Post.findByIdAndUpdate(postId, {
      $pull: {
        likes: username
      }
    });
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error disliking post: ${error.message}`);
  }
};

const deletePost = async (username, postId) => {
  try {
    await Post.findOneAndUpdate(
      { authorUsername: username, _id: postId },
      {
        $set: {
          isDeleted: true
        }
      }
    );
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error deleting post: ${error.message}`);
  }
};

const getPostParents = async (postId, page, limit) => {
  try {
    const aggregation = FormattedPost.aggregate([
      {
        $match: {
          _id: new ObjectId(postId)
        }
      },
      {
        $graphLookup: {
          from: 'formattedposts',
          startWith: '$parentPostId',
          connectFromField: 'parentPostId',
          connectToField: '_id',
          as: 'ancestors'
        }
      },
      {
        $project: {
          ancestors: 1
        }
      },
      {
        $unwind: '$ancestors'
      },
      {
        $replaceRoot: { newRoot: '$ancestors' }
      }
    ]);

    const postComments = await FormattedPost.aggregatePaginate(aggregation, {
      page,
      limit,
      sort: { createdAt: -1 }
    });

    return postComments;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting post comments: ${error.message}`);
  }
};

module.exports = {
  getPostById,
  getPosts,
  getPostComments,
  createPost,
  likePost,
  dislikePost,
  getUserPosts,
  getUserLikes,
  getFollowsPosts,
  editPost,
  deletePost,
  getPostParents
};
