const express = require('express');
const {
  createPostEndoint,
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  getFollowsPostEndpoint,
  editPostEndpoint,
  deletePostEndpoint,
  getPostWithParentsEndpoint
} = require('../controllers');

const router = express.Router();

router.post('/', createPostEndoint);

router.get('/', getPostsEndpoint);

router.get('/follows', getFollowsPostEndpoint);

router.get('/:postId', getPostByIdEndpoint);

router.put('/:postId', editPostEndpoint);

router.delete('/:postId', deletePostEndpoint);

router.get('/:postId/comments', getPostCommentsEndpoint);

router.get('/:postId/parents', getPostWithParentsEndpoint);

module.exports = router;
