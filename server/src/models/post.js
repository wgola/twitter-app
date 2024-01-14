const {
  Schema,
  Schema: {
    Types: { ObjectId }
  },
  model
} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new Schema({
  authorId: {
    type: ObjectId,
    required: true,
    immutable: true
  },
  parentPostId: {
    type: ObjectId,
    immutable: true
  },
  citedPostId: {
    type: ObjectId,
    immutable: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    max: 255
  }
});

postSchema.plugin(mongoosePaginate);

module.exports = model('Post', postSchema);
