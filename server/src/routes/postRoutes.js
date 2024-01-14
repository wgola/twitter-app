const express = require('express');
const {
  createPostEndoint,
  getPostByIdEndpoint,
  getPostsEndpoint,
  getPostCommentsEndpoint
} = require('../controllers/postController');

const router = express.Router();

router.post('/', createPostEndoint);

router.get('/', getPostsEndpoint);

router.get('/:postId', getPostByIdEndpoint);

router.get('/:postId/comments', getPostCommentsEndpoint);

module.exports = router;
