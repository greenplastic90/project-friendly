import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js'

export const secureAdminRoute = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw new Error('Missing header')
		const token = req.headers.authorization.replace('Bearer ', '')

		const payload = jwt.verify(token, secret)

		const userToVerify = await User.findOne({ userName: payload.userName })
		if (!userToVerify) throw new Error('User Not Found')
		if (!userToVerify.isAdmin) throw new Error('Unauthorized, User not an admin')

		next()
	} catch (err) {
		console.log(err)
		return res.status(401).json(err.message)
	}
}
