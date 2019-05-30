import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  name: { type: String, required: true, },
  bio: { type: String },
  profession: { type: ObjectId, ref: "profession", required: true },
  user: { type: ObjectId, ref: "user", required: true }
})

export default class CharacterService {
  get repository() {
    return mongoose.model("character", _schema)
  }
}