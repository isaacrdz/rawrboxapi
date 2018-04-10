import mongoose from 'mongoose';
// import Review from './review';
let Schema = mongoose.Schema;

let JobSchema = new Schema({
  job: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description:{
    type: String,

  },
  salary:{
    type: Number,

  },
  image:{
    type: String,

  },
  location:{
    type:{type:String, default: 'Point'},
    coordinates:{
      "lat":Number,
      "long":Number
    }

  },

});

module.exports = mongoose.model('Job', JobSchema);
