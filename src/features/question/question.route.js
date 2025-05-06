import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { questionValidator } from './question.validation.js'
import { makeQuestion } from './question.controller.js'

export const router = express.Router()

router.post('/choice', authenticatedToken, questionValidator, makeQuestion)
// router.get('/', authenticatedToken, seeAllQuestion)