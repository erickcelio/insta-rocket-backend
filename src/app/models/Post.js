import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: String
  },
  description: {
    type: String
  },
  hashtags: {
    type: String
  },
  image: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default model('Post', PostSchema)
