import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)

  next()
})

export default model('User', userSchema)
