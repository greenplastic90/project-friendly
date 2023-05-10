import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema } = mongoose

const partySchema = new Schema({
	owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true, maxlength: 15 },
})
// a user can't have duplicated party names
partySchema.index({ owner: 1, name: 1 }, { unique: true })

partySchema.plugin(uniqueValidator)

export default mongoose.model('Party', partySchema)
