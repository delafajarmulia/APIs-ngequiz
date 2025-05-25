import express from 'express'
import { loginGoogleValidation, loginValidation, registerValidation } from './auth.validation.js'
import { login, loginGoogle, register } from './auth.controller.js';


export const router = express.Router()

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login)
router.post('/login/google', loginGoogleValidation, loginGoogle)