const {
  getPosts,
  getPostById,
  getPostComments,
  createPost,
  getFollowsPosts,
  editPost,
  deletePost,
  getNewPosts,
  getNewFollowsPosts,
  getNewPostComments
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

const getNewPostsEndpoint = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getNewPosts(page, limit, timestamp);

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

const getNewFollowsPostEndpoint = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getNewFollowsPosts(req.user.username, page, limit, timestamp);

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

const getNewPostCommentsEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const timestamp = req.query.timestamp || new Date().getTime();

    const posts = await getNewPostComments(postId, page, limit, timestamp);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPostEndoint = async (req, res) => {
  try {
    const author = req.user.username;
    const postToCreate = req.body;

    const createdPost = await createPost(author, postToCreate);

    return res.status(201).json(createdPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editPostEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;
    const author = req.user.username;
    const newContent = req.body.newContent;

    const editedPost = await editPost(author, postId, newContent);

    return res.status(201).json(editedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePostEndpoint = async (req, res) => {
  try {
    const postId = req.params.postId;
    const author = req.user.username;

    await deletePost(author, postId);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  createPostEndoint,
  getFollowsPostEndpoint,
  editPostEndpoint,
  deletePostEndpoint,
  getNewPostsEndpoint,
  getNewFollowsPostEndpoint,
  getNewPostCommentsEndpoint
};
