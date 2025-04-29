import express from 'express'
import { loginValidation, registerValidation } from './auth.validation.js'
import { login, register } from './auth.controller.js';


export const router = express.Router()

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login)