import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  initialTimestamp: {
    type: Number,
    default: Date.now()
  },

  finalTimeStamp: {
    type: Number,
    default: null
  },

  status: {
    type: String, 
    enum: ["Processing", "Failed", "completed"],
    default: "Processing"
  }

});


export const postModel = mongoose.model('post', postSchema);
