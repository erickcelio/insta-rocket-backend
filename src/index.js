import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import { mongo_connect_string } from './config/credentials'

import Routes from './routes'

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(mongo_connect_string, {
  useNewUrlParser: true,
  useCreateIndex: true
})

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(bodyParser.json())

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(Routes)

server.listen(3333)
