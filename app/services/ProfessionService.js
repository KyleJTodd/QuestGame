import mongoose from 'mongoose'
let ObjectId = mongoose.Schema.Types.ObjectId

let _skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true, default: 1 }
})

let _schema = new mongoose.Schema({
  name: { type: String, required: true, },
  description: { type: String },
  skills: [_skillSchema]
})


export default class ProfessionService {
  get repository() {
    return mongoose.model("profession", _schema)
  }
}