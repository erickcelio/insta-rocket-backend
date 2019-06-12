import express from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import {
  PostController,
  AuthController,
  LikeController
} from './app/controllers'

import { AuthMiddleware } from './app/middlewares'

const routes = new express.Router()
const upload = multer(uploadConfig)

// POST
routes.get('/posts', AuthMiddleware, PostController.index);
routes.post('/posts', AuthMiddleware, upload.single('image'), PostController.store)

// LIKE
routes.post('/posts/:id/like', AuthMiddleware, upload.single('image'), LikeController.store)

// AUTH
routes.post('/register', AuthController.store)
routes.post('/login', AuthController.auth)

module.exports = routes