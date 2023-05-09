import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { deleteUser, getUserProfile, updateProfile } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'
import { addUserIcon } from '../controllers/userIcon.js'

const router = express.Router()

//? Auth
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

//? Profile
router
	.route('/user-profile')
	.delete(secureRoute, deleteUser)
	.get(secureRoute, getUserProfile)
	.put(secureRoute, updateProfile)

//? UserIcons
//! only admins can create
router.route('/user-icons').post(addUserIcon)

export default router
