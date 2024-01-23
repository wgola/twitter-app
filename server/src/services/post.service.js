const { LOG } = require('../config');
const { notifyMainPage } = require('./ws.service');
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

    notifyMainPage(post.authorUsername);

    return formattedCreatedPost;
  } catch (error) {
    LOG.error(error.message);

    throw new Error(`Error creating post: ${error.message}`);
  }
};

module.exports = {
  getPostById,
  getPosts,
  getPostComments,
  createPost
};
