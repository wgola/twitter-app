const { LOGGER } = require('../config');
const { Post, FormattedPost } = require('../models');

const getPosts = async (page) => {
  try {
    const postsAggregation = await FormattedPost.paginate({}, { page, limit: 5 });

    return postsAggregation;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting posts: ${err}`);
  }
};

const getPostById = async (postId) => {
  try {
    const foundPost = await FormattedPost.findById(postId);

    return foundPost;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting post by ID: ${err}`);
  }
};

const getPostComments = async (postId, page) => {
  try {
    const postComments = await FormattedPost.paginate({ parentPostId: postId }, { page, limit: 5 });

    return postComments;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting post comments: ${err}`);
  }
};

const createPost = async (post) => {
  try {
    const createdPost = await Post.create(post);

    const formattedCreatedPost = await FormattedPost.findById(createdPost._id);

    return formattedCreatedPost;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error creating post: ${err}`);
  }
};

module.exports = {
  getPostById,
  getPosts,
  getPostComments,
  createPost
};
