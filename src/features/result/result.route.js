import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { changeResult, makeResult, resultById, resultMyQuizDone } from './result.controller.js'
import { resultValidator } from './result.validation.js'

export const router = express.Router()

router.post('/', authenticatedToken, resultValidator, makeResult)
router.get('/me', authenticatedToken, resultMyQuizDone)
router.get('/:id', authenticatedToken, resultValidator, resultById)
// router.put('/:id', authenticatedToken, changeResult)