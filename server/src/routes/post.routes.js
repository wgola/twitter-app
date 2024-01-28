const express = require('express');
const {
  createPostEndoint,
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint,
  getFollowsPostEndpoint,
  editPostEndpoint,
  deletePostEndpoint,
  getNewPostsEndpoint,
  getNewFollowsPostEndpoint,
  getNewPostCommentsEndpoint,
  getPostWithParentsEndpoint
} = require('../controllers');

const router = express.Router();

router.post('/', createPostEndoint);

router.get('/', getPostsEndpoint);

router.get('/new', getNewPostsEndpoint);

router.get('/follows', getFollowsPostEndpoint);

router.get('/new/follows', getNewFollowsPostEndpoint);

router.get('/:postId', getPostByIdEndpoint);

router.put('/:postId', editPostEndpoint);

router.delete('/:postId', deletePostEndpoint);

router.get('/:postId/comments', getPostCommentsEndpoint);

router.get('/:postId/newComments', getNewPostCommentsEndpoint);

router.get('/:postId/parents', getPostWithParentsEndpoint);

module.exports = router;
