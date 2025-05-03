import express from 'express'
import { authenticatedToken } from '../../middleware/authenticatedToken.js';
import { findMe } from './user.controller.js';

export const router = express.Router()

router.get('/me', authenticatedToken, findMe)