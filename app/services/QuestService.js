import mongoose from 'mongoose'
let name = "quest"


let _schema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  description: { type: String, default: "" },
  xp: { type: Number, required: true, default: 100 },
})


export default class QuestService {
  get repository() {
    return mongoose.model(name, _schema)
  }
}