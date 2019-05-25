// the convention for Models is to be singular and capitalized

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema

const Profile_Schema = new Schema({
   user: {
      type: Schema.Types.ObjectId, // associate the user by ID
      ref: 'users', // which mongo collection this refers to
   },
   handle: {
      // an SEO-friendly URL for profiles
      type: String,
      required: true,
      max: 40,
   },
   company: {
      type: String,
   },
   website: {
      type: String,
   },
   location: {
      type: String,
   },
   status: {
      type: String,
      required: true, // will be a select input
   },
   skills: {
      type: [String], // array of strings
      required: true,
   },
   bio: {
      type: String,
   },
   githubusername: {
      type: String,
   },
   experience: [
      {
         title: {
            type: String,
            required: true,
         },
         company: {
            type: String,
            required: true,
         },
         location: {
            type: String,
         },
         from: {
            type: Date,
            required: true,
         },
         to: {
            type: Date,
         },
         current: {
            type: Boolean,
            default: false,
         },
         description: {
            type: String,
         },
      },
   ],
   education: [
      {
         school: {
            type: String,
            required: true,
         },
         degree: {
            type: String,
            required: true,
         },
         fieldofstudy: {
            type: String,
            required: true,
         },
         from: {
            type: Date,
            required: true,
         },
         to: {
            type: Date,
         },
         current: {
            type: Boolean,
            default: false,
         },
         description: {
            type: String,
         },
      },
   ],
   social: {
      youtube: {
         type: String,
      },
      twitter: {
         type: String,
      },
      facebook: {
         type: String,
      },
      linkedin: {
         type: String,
      },
      instagram: {
         type: String,
      },
   },
   date: {
      type: Date,
      default: Date.now,
   },
})

module.exports = Profile = mongoose.model('profile', Profile_Schema)
