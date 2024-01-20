const { Schema, model } = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      immutable: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    profilePicture: {
      url: {
        type: String,
        default: null
      },
      id: {
        type: String,
        default: null
      }
    },
    description: {
      type: String,
      max: 100,
      trim: true,
      default: ''
    },
    follows: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

userSchema.plugin(aggregatePaginate);

module.exports = model('User', userSchema);
