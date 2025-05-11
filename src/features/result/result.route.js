import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js'
import { makeResult } from './result.controller.js'
import { resultValidator } from './result.validation.js'

export const router = express.Router()

router.post('/', authenticatedToken, resultValidator, makeResult)