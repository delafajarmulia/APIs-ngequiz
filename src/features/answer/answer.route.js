import express from 'express'
import { submitAnswer, userAnswer } from './answer.controller.js'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { submitAnswerValidation } from './answer.validation.js'

export const router = express.Router()

router.post('/submit-answer', authenticatedToken, submitAnswerValidation, submitAnswer)
router.get('/quiz/:quizId', authenticatedToken, userAnswer)