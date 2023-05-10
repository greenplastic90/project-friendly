import { UserIcon } from '../models/user.js'

export const addUserIcon = async (req, res) => {
	try {
		const newUserIcon = await UserIcon.create({ ...req.body })
		return res.status(201).json(newUserIcon)
	} catch (err) {
		return res.status(422).json(err)
	}
}

export const getAllUserIcons = async (_req, res) => {
	try {
		const userIcons = await UserIcon.find()
		return res.status(200).json(userIcons)
	} catch (err) {
		return res.status(422).json(err)
	}
}

export const deleteUserIcons = async (req, res) => {
	try {
		const { ids } = req.query

		if (!ids) {
			return res.status(400).json({ message: 'Please provide ids as a query parameter.' })
		}

		const idArray = ids.split(',')

		const result = await UserIcon.deleteMany({ _id: { $in: idArray } })

		if (result.n === 0) {
			return res.status(404).json({ message: 'No icons were found with the provided ids.' })
		}

		return res.status(200).json({ message: `${result.deletedCount} icon(s) successfully deleted.` })
	} catch (err) {
		if (err.message === 'INVALID_ID') {
			return res.status(400).json({ message: 'One or more provided ids are not valid ObjectIds.' })
		}
		return res.status(422).json(err)
	}
}
