const {
  Schema,
  Schema: {
    Types: { ObjectId }
  },
  model
} = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const postSchema = new Schema(
  {
    authorUsername: {
      type: String,
      required: true,
      immutable: true
    },
    parentPostId: {
      type: ObjectId,
      immutable: true
    },
    quotedPostId: {
      type: ObjectId,
      immutable: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      max: 255
    },
    likes: [
      {
        type: String
      }
    ]
  },
  { autoCreate: false, autoIndex: false, timestamps: true }
);

postSchema.plugin(paginate);

const Post = model('Post', postSchema);

Post.createCollection();

const FormattedPost = model('FormattedPost', postSchema);

FormattedPost.createCollection({
  viewOn: 'posts',
  pipeline: [
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
      $sort: { createdAt: -1 }
    },
    {
      $project: {
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        content: 1,
        likes: 1,
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
  ]
});

module.exports = { Post, FormattedPost };
