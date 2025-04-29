import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import {router as userRoute } from './features/auth/auth.route.js'
import { router as quizRoute } from './features/quiz/quiz.route.js'

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors())

app.use(express.json())

const mainURL = '/api/v1'

app.use(mainURL + '/user/auth', userRoute)
app.use(mainURL + '/quiz', quizRoute)

app.listen(port, () => {
    console.log(`This server running on port ${port}`)
})