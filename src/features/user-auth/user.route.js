import express from 'express'
import { loginValidation, registerValidation } from './user.validation.js'
import { login, register } from './user.controller.js';


export const router = express.Router()

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login)