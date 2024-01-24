const {
  getPosts,
  getPostById,
  getPostComments,
  createPost,
  getFollowsPosts
} = require('../services');

const getPostByIdEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await getPostById(postId);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostsEndpoint = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getPosts(page, limit, timestamp);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFollowsPostEndpoint = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getFollowsPosts(req.user.username, page, limit, timestamp);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostCommentsEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getPostComments(postId, page, limit, timestamp);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPostEndoint = async (req, res) => {
  try {
    const postToCreate = req.body;

    const createdPost = await createPost(postToCreate);

    return res.status(201).json(createdPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  createPostEndoint,
  getFollowsPostEndpoint
};
