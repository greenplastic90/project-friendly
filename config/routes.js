import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { deleteUser, getUserProfile, updateProfile } from '../controllers/user.js'
import { secureRoute } from './secureRoute.js'
import { addUserIcon, deleteUserIcons, getAllUserIcons } from '../controllers/userIcon.js'
import { secureAdminRoute } from './secureAdminRoute.js'
import { createParty, getPartyById, getUserParties } from '../controllers/party.js'

const router = express.Router()

//? Auth
router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)

//? Profile
router
	.route('/user-profile')
	.delete(secureRoute, deleteUser)
	.get(secureRoute, getUserProfile)
	.put(secureRoute, updateProfile)

//? UserIcons
//! only admins can create
router
	.route('/user-icons')
	.post(secureAdminRoute, addUserIcon)
	.get(getAllUserIcons)
	.delete(secureAdminRoute, deleteUserIcons)

//? Parties
router.route('/parties').post(secureRoute, createParty).get(secureRoute, getUserParties)
router.route('/parties/:id').get(secureRoute, getPartyById)

export default router
