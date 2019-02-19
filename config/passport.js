const jwt_strategy = require('passport-jwt').Strategy
const extract_jwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('./keys')

const options = {}
options.jwtFromRequest = extract_jwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.jwt_secret

module.exports = passport => {
   passport.use(
      new jwt_strategy(options, (jwt_payload, is_done) => {
         User.findById(jwt_payload.id)
            .then(user => {
               if (user) return is_done(null, user)
               else return is_done(null, false)
            })
            .catch(err => console.log(err))
      })
   )
}
