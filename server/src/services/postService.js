const Post = require('../models/post');

const getPosts = async (page) => {
  const posts = await Post.paginate({}, { page, limit: 10, sort: { _id: 1 } });

  return posts;
};

const getPostById = async (postId) => {
  const post = await Post.findById(postId);

  return post;
};

const getPostComments = async (postId, page) => {
  const posts = await Post.paginate(
    { parentPostId: postId },
    { page: page, limit: 10, sort: { _id: -1 } }
  );

  return posts;
};

const createPost = async (post) => {
  const createdPost = await Post.create(post);

  return createdPost;
};

module.exports = {
  getPostById,
  getPosts,
  getPostComments,
  createPost
};
