import express from 'express'
import { quizValidator } from './quiz.validation.js'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { makeQuiz, removeMyQuiz, seeAllQuiz, seeAllQuizName, takeMyQuiz, takeQuiz, takeQuizNameById } from './quiz.controller.js'

export const router = express.Router()

router.post('/', authenticatedToken, quizValidator, makeQuiz)
router.get('/me', authenticatedToken, takeMyQuiz)
router.get('/name', authenticatedToken, seeAllQuizName)
router.get('/:id/name', authenticatedToken, takeQuizNameById)
router.get('/:id', authenticatedToken, takeQuiz)
router.get('/', authenticatedToken, seeAllQuiz)
router.delete('/:id', authenticatedToken, removeMyQuiz)