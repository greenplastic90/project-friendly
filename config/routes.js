import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'

const router = express.Router()

export default router
router.route('/register').post(registerUser)

router.route('/login').post(loginUser)
