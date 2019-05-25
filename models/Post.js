// the convention for Models is to be singular and capitalized

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema

const PostSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
   },
   text: {
      type: String,
      required: true,
   },
   // we want to duplicate name and avatar
   // because if a user deletes their account, we still want a post to have a name and avatar attached.
   name: {
      type: String,
   },
   avatar: {
      type: String,
   },
   likes: [
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
         },
      },
   ],
   comments: [
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
         },
         text: {
            type: String,
            required: true,
         },
         name: {
            type: String,
         },
         avatar: {
            type: String,
         },
         date: {
            type: Date,
            default: Date.now(),
         },
      },
   ],
   date: {
      type: Date,
      default: Date.now(),
   },
})

module.exports = Post = mongoose.model('posts', PostSchema)
