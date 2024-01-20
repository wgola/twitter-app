const { LOGGER } = require('../config');
const { Post } = require('../models');

const getPosts = async (currentUserUsername, page) => {
  try {
    const postsAggregation = Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'authorUsername',
          foreignField: 'username',
          as: 'author'
        }
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'quotedPostId',
          foreignField: '_id',
          as: 'quotedPost'
        }
      },
      {
        $addFields: {
          quotedPostAuthorUsername: '$quotedPost.authorUsername'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'quotedPostAuthorUsername',
          foreignField: 'username',
          as: 'quotedPostAuthor'
        }
      },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'parentPostId',
          as: 'comments'
        }
      },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'quotedPostId',
          as: 'quotations'
        }
      },
      {
        $unwind: '$author'
      },
      {
        $unwind: {
          path: '$quotedPost',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$quotedPostAuthor',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          likesCount: { $size: '$likes' },
          isLiked: { $in: [currentUserUsername, '$likes'] },
          commentsCount: { $size: '$comments' },
          quotationsCount: { $size: '$quotations' },
          author: {
            _id: '$author._id',
            username: '$author.username',
            firstname: '$author.firstname',
            surname: '$author.surname',
            profilePictureUrl: '$author.profilePicture.url'
          },
          parentPostId: 1,
          quotedPost: {
            _id: '$quotedPost._id',
            content: '$quotedPost.content',
            author: {
              _id: '$quotedPostAuthor._id',
              username: '$quotedPostAuthor.username',
              firstname: '$quotedPostAuthor.firstname',
              surname: '$quotedPostAuthor.surname',
              profilePictureUrl: '$quotedPostAuthor.profilePicture.url'
            }
          }
        }
      }
    ]);

    return await Post.aggregatePaginate(postsAggregation, { page, limit: 10 });
  } catch (err) {
    LOGGER.error(err);

    console.log(err);

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
