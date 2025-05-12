import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { makeResult, resultById, resultMyQuizDone } from './result.controller.js'
import { resultValidator } from './result.validation.js'

export const router = express.Router()

router.post('/', authenticatedToken, resultValidator, makeResult)
router.get('/me', authenticatedToken, resultMyQuizDone)
router.get('/quiz/:id', authenticatedToken, resultValidator, resultById)