import { UserIcon } from '../models/user.js'

export const addUserIcon = async (req, res) => {
	try {
		const newUserIcon = await UserIcon.create({ ...req.body })
		return res.status(201).json(newUserIcon)
	} catch (err) {
		return res.status(422).json(err)
	}
}
