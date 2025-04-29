import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import {router as userRoute } from './features/auth/auth.route.js'
import { router as quizRoute } from './features/quiz/quiz.route.js'
import { router as choiceRoute } from './features/choice/choice.route.js'
import { router as questionRoute } from './features/question/question.route.js'

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors())

app.use(express.json())

const mainURL = '/api/v1'

app.use(mainURL + '/user/auth', userRoute)
app.use(mainURL + '/quiz', quizRoute)
app.use(mainURL + '/question', questionRoute)
app.use(mainURL + '/choice', choiceRoute)

app.listen(port, () => {
    console.log(`This server running on port ${port}`)
})