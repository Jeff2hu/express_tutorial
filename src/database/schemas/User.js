const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes

const UserSchema = new Schema({
  userName: {
    type: SchemaTypes.String,
    required: true
  },
  password: {
    type: SchemaTypes.String,
    required: true
  },
  email: {
    type: SchemaTypes.String,
    required: true
  },
  createdAt: {
    type: SchemaTypes.Date,
    required: true,
    default: new Date()
  },
})

module.exports = mongoose.model('users', UserSchema)