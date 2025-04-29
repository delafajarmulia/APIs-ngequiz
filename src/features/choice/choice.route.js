import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { choiceValidator } from './choice.validation.js'
import { makeChoice } from './choice.controller.js'

export const router = express.Router()

router.post('/', authenticatedToken, choiceValidator, makeChoice)