import Party from '../models/party.js'

export const createParty = async (req, res) => {
	try {
		const newParty = await Party.create({
			...req.body,
			owner: req.currentUser._id,
		})
		res.status(201).json(newParty)
	} catch (err) {
		res.status(400).json({ errors: err.errors })
	}
}

export const getParties = async (_req, res) => {
	try {
		const parties = await Party.find().populate('owner')
		res.status(200).json(parties)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const getPartyById = async (req, res) => {
	try {
		const party = await Party.findById(req.params.id).populate('owner')
		if (!party) return res.status(404).json({ message: 'Party not found' })
		res.status(200).json(party)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateParty = async (req, res) => {
	try {
		const party = await Party.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		}).populate('owner')
		if (!party) return res.status(404).json({ message: 'Party not found' })
		res.status(200).json(party)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const deleteParty = async (req, res) => {
	try {
		const party = await Party.findByIdAndDelete(req.params.id)
		if (!party) return res.status(404).json({ message: 'Party not found' })
		res.status(204).json({ message: 'Party successfully deleted' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
