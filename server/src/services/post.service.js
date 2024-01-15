const { LOGGER } = require('../config');
const Post = require('../models');

const getPosts = async (page) => {
  try {
    const posts = await Post.paginate({}, { page, limit: 10, sort: { _id: 1 } });

    return posts;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting posts: ${err}`);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);

    return post;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting post by ID: ${err}`);
  }
};

const getPostComments = async (postId, page) => {
  try {
    const posts = await Post.paginate(
      { parentPostId: postId },
      { page: page, limit: 10, sort: { _id: -1 } }
    );

    return posts;
  } catch (err) {
    LOGGER.error(err);

    throw new Error(`Error getting post comments: ${err}`);
  }
};

const createPost = async (post) => {
  try {
    const createdPost = await Post.create(post);

    return createdPost;
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
