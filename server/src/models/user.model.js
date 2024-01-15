const {
  Schema,
  Schema: {
    Types: { ObjectId }
  },
  model
} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    max: 100,
    trim: true
  },
  follows: [
    {
      type: ObjectId
    }
  ]
});

module.exports = model('User', userSchema);
