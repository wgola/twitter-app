const { getPosts, getPostById, getComments, createPost } = require('../services');

const getPostByIdEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await getPostById(postId);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getPostsEndpoint = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const posts = await getPosts(page);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getPostCommentsEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;
    const page = req.query.page || 1;

    const posts = await getComments(postId, page);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createPostEndoint = async (req, res) => {
  try {
    const postToCreate = req.body;

    const createdPost = await createPost(postToCreate);

    return res.status(201).json(createdPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  createPostEndoint
};
