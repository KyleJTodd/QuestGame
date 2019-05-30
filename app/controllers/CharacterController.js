import express from 'express'
import CharacterService from '../services/CharacterService'

let _service = new CharacterService()
let _repo = _service.repository


export default class CharacterController {
  constructor() {
    this.router = express.Router()
      .get("/:id", this.getCharacter)
      .get('/user/:id', this.getAllCharacters)
      .post("", this.createCharacter)
      .use("*", this.defaultRoute)
  }
  async getCharacter(req, res, next) {
    try {
      let character = await _repo.findById(req.params.id).populate("profession")
      return res.send(character)
    } catch (error) { next(error) }
  }

  async getAllCharacters(req, res, next) {
    try {
      let characters = await _repo.find({ user: req.params.id }).populate("profession", "name description")
      return res.send(characters)
    } catch (error) { next(error) }
  }

  async createCharacter(req, res, next) {
    try {
      let character = await _repo.create(req.body)
      return res.status(201).send(character)
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    res.status(404).send('No Such Route. Go home.')
  }


}