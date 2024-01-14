const { getPosts, getPostById, getComments, createPost } = require('../services/postService');

const getPostByIdEndpoint = async (req, res) => {
  const postId = req.params.postId;

  const post = await getPostById(postId);

  return res.status(200).json(post);
};

const getPostsEndpoint = async (req, res) => {
  const page = req.query.page || 1;

  const posts = await getPosts(page);

  return res.status(200).json(posts);
};

const getPostCommentsEndpoint = async (req, res) => {
  const postId = req.params.postId;
  const page = req.query.page || 1;

  const posts = await getComments(postId, page);

  return res.status(200).json(posts);
};

const createPostEndoint = async (req, res) => {
  const postToCreate = req.body;

  const createdPost = createPost(postToCreate);

  return res.status(201).json(createdPost);
};

module.exports = {
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  createPostEndoint
};
