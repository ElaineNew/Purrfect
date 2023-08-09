const mongoose = require('mongoose');


const AdoptionSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  age: {
      type: Number,
      required: true,
      min:[0, 'Age cannot be under 0!']
    },
    email:{
      type: String,
      required: true,
    },
    phone:{
      type: String,
      required: true,
    },
    message:{
      type: String,
      required: true,
    },
    adopter:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    pet:{
      type:mongoose.Schema.Types.ObjectId,
    ref:'Pet'
    },
    status:{
      type: String,
      enum:['pending', 'rejected', 'accepted']
      // default:'pending'
    }

})
const Adoption = mongoose.model('Adoption', AdoptionSchema)


module.exports = Adoption;
