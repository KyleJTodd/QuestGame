import express from 'express'
import CharacterQuestsService from '../services/CharacterQuestsService';

let _service = new CharacterQuestsService()

export default class CharacterQuestsController {

  constructor() {
    this.router = express.Router()
      .get("/:characterId", this.GetCharacterQuests)
      .post("/:characterId/:questId", this.JoinQuest)
      .put("/:characterId/:questId", this.ChangeQuestStatus)
  }

  async GetCharacterQuests(req, res, next) {
    // find all quests that this character is on
    try {
      let quests = await _service.GetCharacterQuests(req.params.characterId)
      res.send(quests)
    } catch (e) { next(e) }
  }

  async JoinQuest(req, res, next) {
    // find all quests that this character is on
    try {
      let quest = await _service.JoinQuest(req.params.characterId, req.params.questId)
      res.send(quest)
    } catch (e) { next(e) }
  }

  async ChangeQuestStatus(req, res, next) {
    try {
      let q = await _service.UpdateQuestStatus(req.body)
      res.send(q)
    } catch (error) {
      next(error)
    }
  }

}