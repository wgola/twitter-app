const {
  Schema,
  Schema: {
    Types: { ObjectId }
  },
  model
} = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

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
  { timestamps: true }
);

postSchema.plugin(aggregatePaginate);

module.exports = model('Post', postSchema);
