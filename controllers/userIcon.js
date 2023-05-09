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
