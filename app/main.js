import express from 'express'
import './db/dbconfig'

let server = express()
let port = 3000
let bp = require('body-parser')

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())

//register routes
import UserController from './controllers/UserController';
import CharacterController from './controllers/CharacterController';
import ProfessionController from './controllers/ProfessionController';
import QuestController from './controllers/QuestController';
import CharacterQuestsController from './controllers/CharacterQuestsController';
server.use('/api/users', new UserController().router)
server.use('/api/characters', new CharacterController().router)
server.use('/api/professions', new ProfessionController().router)
server.use('/api/quests', new QuestController().router)
server.use('/api/character-quests', new CharacterQuestsController().router)

//default error handler
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } })
})

server.listen(port, () => {
  console.log("yeet " + port)
})
