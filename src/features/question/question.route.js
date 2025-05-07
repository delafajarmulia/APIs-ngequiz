import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { questionsValidator, questionValidator } from './question.validation.js'
import { makeOneQuestionAndChoices, makeQuestion } from './question.controller.js'

export const router = express.Router()

router.post('s/choice', authenticatedToken, questionsValidator, makeQuestion)
router.post('/choice', authenticatedToken, questionValidator, makeOneQuestionAndChoices)
// router.get('/', authenticatedToken, seeAllQuestion)