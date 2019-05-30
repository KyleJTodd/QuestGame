import mongoose from 'mongoose'
let name = "characterquests"
let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  questId: { type: ObjectId, ref: "quest", required: true },
  characterId: { type: ObjectId, ref: "character", required: true },
  status: { type: String, enum: ["Accepted", "Completed", "Failed"], default: "Accepted", required: true }
})

let _repo = mongoose.model(name, _schema)

export default class CharacterQuestsService {


  async JoinQuest(characterId, questId) {
    let characterQuest = await _repo.findOne({ questId, characterId })
    if (characterQuest) { throw new Error("ALREADY ON QUEST") }
    let record = await _repo.create({ questId, characterId })
    return record
  }

  async GetCharacterQuests(characterId) {
    if (!characterId) { throw new Error("You Must provide a character Id") }
    let quests = await _repo.find({ characterId }).populate('questId')
    return quests
  }

  async UpdateQuestStatus(updatedQuest) {
    let quest = await _repo.findById(updatedQuest._id)
    if (!quest) { throw new Error("NO QUEST DATA FOUND") }
    quest.status = updatedQuest.status
    await quest.save()
    return quest
  }


}