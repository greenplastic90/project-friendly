import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async (req, res) => {
	try {
		// console.log(req.body)
		const newUser = await User.create(req.body)
		// console.log(newUser)
		// accepted 202
		return res.status(202).json(newUser)
	} catch (err) {
		console.log(err)
		// unprocessable entity 422
		return res.status(422).json(err)
	}
}

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body
		const userToLogin = await User.findOne({ email: email })
		if (!userToLogin || !userToLogin.validatePassword(password)) throw new Error('Unauthorised')

		const token = jwt.sign(
			{
				sub: userToLogin._id,
				userName: userToLogin.userName,
				email: userToLogin.email,
			},
			secret,
			{ expiresIn: '7 days' }
		)
		return res.status(200).json({ message: `Welcome back ${userToLogin.userName}`, token: token })
	} catch (err) {
		console.log(err)
		return res.status(401).json({ message: err.message })
	}
}
