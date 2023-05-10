import mongoose from 'mongoose'

const { Schema } = mongoose

const partySchema = new Schema({
	owner: { type: mongoose.Schema.ObjectId, required: true },
	name: { type: String, required: true, maxlength: 15 },
})
