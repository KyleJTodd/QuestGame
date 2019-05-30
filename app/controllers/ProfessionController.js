import express from 'express'
import ProfessionService from '../services/ProfessionService'

let _service = new ProfessionService()
let _repo = _service.repository


export default class ProfessionController {
  constructor() {
    this.router = express.Router()
      .get("/:id", this.getProfession)
      .get('', this.getAllProfessions)
      .post("", this.createProfession)
      .use("*", this.defaultRoute)
  }
  async getProfession(req, res, next) {
    try {
      let profession = await _repo.findById(req.params.id)
      return res.send(profession)
    } catch (error) { next(error) }
  }

  async getAllProfessions(req, res, next) {
    try {
      let professions = await _repo.find({})
      return res.send(professions)
    } catch (error) { next(error) }
  }

  async createProfession(req, res, next) {
    try {
      let profession = await _repo.create(req.body)
      return res.status(201).send(profession)
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    res.status(404).send('No Such Route. Go home.')
  }
}