const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require:true
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  age:{
    type: Number
  },
  gender:{
    type: String
  },
  phone:{
    type: String,
  },
  email:{
    type: String,
    required: true
  },
  job:{
    type: String
  },
  isAdministrator: {
    type: Boolean,
    default: true
  },
  markedPets:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Pet'
  }]
})
//passportLocalMongoose: requires username and password to be nunique
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User