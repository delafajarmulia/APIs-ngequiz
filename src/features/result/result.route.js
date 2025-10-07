import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { makeResult, resultById, resultByQuizId, resultMyQuizDone, userScore, whoPlayMyQuiz } from './result.controller.js'
import { resultValidator } from './result.validation.js'

export const router = express.Router()

router.post('/', authenticatedToken, resultValidator, makeResult)
router.get('/me', authenticatedToken, resultMyQuizDone)
router.get('/:id', authenticatedToken, resultValidator, resultById)
router.get('/quiz/:id', resultByQuizId)
router.get('/:id/score', authenticatedToken, userScore)
router.get('/my-quiz/:id', authenticatedToken, whoPlayMyQuiz)