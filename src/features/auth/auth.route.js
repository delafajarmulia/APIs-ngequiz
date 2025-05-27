import express from 'express'
import { loginGoogleValidation, loginValidation, registerGoogleValidation, registerValidation } from './auth.validation.js'
import { login, loginGoogle, register, registWithGoogle } from './auth.controller.js';


export const router = express.Router()

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login)
router.post('/login/google', loginGoogleValidation, loginGoogle)
router.post('/register/google', registerGoogleValidation, registWithGoogle)