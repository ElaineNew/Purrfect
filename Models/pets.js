const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload', '/upload/w_200')
})

const PetSchema = new mongoose.Schema({
  images:[ImageSchema],
  category:{
    type:String,
    enum:['cat','dog','other'],
    required:true
  },
  name: {
      type: String,
      required: true,
      maxlength: [20, 'Name is too long!']
    },
  age: {
      type: Number,
      required: true,
      min:[0, 'Age cannot be under 0!']
    },
  breed: String,
  color: String,
  status: {
    type: String,
    enum:['available', 'pending', 'adopted'],
    default:'available'
  },
  size: {
      type:String,
      enum:['small', 'medium','large']
  },
  weight: Number,
  description:String,
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
})
const Pet = mongoose.model('Pet', PetSchema)


module.exports = Pet;
