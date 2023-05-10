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

export const getUserParties = async (req, res) => {
	try {
		const parties = await Party.find({ owner: req.currentUser._id })
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

// export const updateParty = async (req, res) => {
// 	try {
// 		const party = await Party.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true,
// 			runValidators: true,
// 		}).populate('owner')
// 		if (!party) return res.status(404).json({ message: 'Party not found' })
// 		res.status(200).json(party)
// 	} catch (error) {
// 		res.status(400).json({ message: error.message })
// 	}
// }

export const deleteUserParties = async (req, res) => {
	try {
		const { ids } = req.query

		if (!ids) {
			return res.status(400).json({ message: 'Please provide ids as a query parameter.' })
		}

		const idArray = ids.split(',')

		const partiesToDelete = await Party.find({ _id: { $in: idArray } })

		await Promise.all(
			partiesToDelete.map((party) => {
				if (!party.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
			})
		)

		const result = await Party.deleteMany({ _id: { $in: idArray } })

		if (result.deletedCount === 0) {
			return res.status(404).json({ message: 'No parties were found with the provided ids.' })
		}

		return res
			.status(200)
			.json({ message: `${result.deletedCount} party(ies) successfully deleted.` })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
