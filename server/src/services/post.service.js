const { LOG, io } = require('../config');
const { Post, FormattedPost } = require('../models');

const getPosts = async (page, limit, timestamp) => {
  try {
    const postsAggregation = await FormattedPost.paginate(
      { createdAt: { $lt: timestamp } },
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
      { 'author.username': username, createdAt: { $lt: timestamp } },
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
      { likes: username, createdAt: { $lt: timestamp } },
      { page, limit }
    );

    return postsAggregation;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting posts: ${error.message}`);
  }
};

const getPostComments = async (postId, page, limit, timestamp) => {
  try {
    const postComments = await FormattedPost.paginate(
      { parentPostId: postId, createdAt: { $lt: timestamp } },
      { page, limit }
    );

    return postComments;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error getting post comments: ${error.message}`);
  }
};

const createPost = async (post) => {
  try {
    const createdPost = await Post.create(post);

    const formattedCreatedPost = await FormattedPost.findById(createdPost._id);

    if (post.parentPostId) {
      io.to(post.parentPostId).except(post.authorUsername).emit('new-post');
    } else {
      io.to('main-page').except(post.authorUsername).emit('new-post');
    }

    return formattedCreatedPost;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error creating post: ${error.message}`);
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

module.exports = {
  getPostById,
  getPosts,
  getPostComments,
  createPost,
  likePost,
  dislikePost,
  getUserPosts,
  getUserLikes
};
