var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema);
