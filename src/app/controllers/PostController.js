import sharp from 'sharp'
import { resolve } from 'path'
import { unlinkSync } from 'fs'

import {Post, User} from '../models'

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt')
    const postsWithAuthor = await Promise.all(posts.map(async (post) => {
      post.author = await User.findById(post.author)
      return post
    }))
    return res.json(postsWithAuthor)
  },

  async store(req, res) {
    const { userId } = req
    const { place, description, hashtags } = req.body
    const { filename: image } = req.file

    const [ name ] = image.split('.')
    const fileName = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(resolve(req.file.destination, 'resized', fileName))

    unlinkSync(req.file.path)

    const post = await Post.create({
      author: userId,
      place,
      description,
      hashtags,
      image: fileName
    })

    req.io.emit('post', post)

    return res.json({ post })
  }
}
