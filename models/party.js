import mongoose from 'mongoose'

const { Schema } = mongoose

const partySchema = new Schema({
	owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
	name: { type: String, required: true, maxlength: 15 },
})
export default mongoose.model('Party', eventSchema)
