import express from 'express'
import { quizValidator } from './quiz.validation.js'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { makeQuiz, takeQuiz } from './quiz.controller.js'

export const router = express.Router()

router.post('/', authenticatedToken, quizValidator, makeQuiz)
router.get('/:id', authenticatedToken, takeQuiz)