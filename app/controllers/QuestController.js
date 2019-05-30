import express from 'express'
import QuestService from '../services/QuestService'

let _service = new QuestService()
let _repo = _service.repository


export default class QuestController {
  constructor() {
    this.router = express.Router()
      .get("/:id", this.getQuest)
      .get('', this.getAllQuests)
      .post("", this.createQuest)
      .use("*", this.defaultRoute)
  }
  async getQuest(req, res, next) {
    try {
      let quest = await _repo.findById(req.params.id)
      return res.send(quest)
    } catch (error) { next(error) }
  }

  async getAllQuests(req, res, next) {
    try {
      let quests = await _repo.find({})
      return res.send(quests)
    } catch (error) { next(error) }
  }

  async createQuest(req, res, next) {
    try {
      let quest = await _repo.create(req.body)
      return res.status(201).send(quest)
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    res.status(404).send('No Such Route. Go home.')
  }
}