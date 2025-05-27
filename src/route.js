import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import {router as authRoute } from './features/auth/auth.route.js'
import { router as quizRoute } from './features/quiz/quiz.route.js'
import { router as choiceRoute } from './features/choice/choice.route.js'
import { router as questionRoute } from './features/question/question.route.js'
import { router as userRoute } from './features/user/user.route.js'
import { router as answerRouter } from './features/answer/answer.route.js'
import { router as resultRouter } from './features/result/result.route.js'

dotenv.config()
const app = express()

const port = process.env.PORT

// const corsOptions = {
//   origin: [
//     'http://localhost:5173',
//     'https://ngequiz.netlify.app'
// ], // frontend kamu
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // sesuaikan kalau pakai header lain
//   credentials: true,
//   optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions))

// // Pastikan OPTIONS request di-handle dengan cors juga
// app.options('*', cors(corsOptions))

app.use(cors())

app.use(express.json())

const mainURL = '/api/v1'

app.get('/', (req, res) => res.send('hello world'))
app.use(mainURL + '/user/auth', authRoute)
app.use(mainURL + '/quiz', quizRoute)
app.use(mainURL + '/question', questionRoute)
app.use(mainURL + '/choice', choiceRoute)
app.use(mainURL + '/user', userRoute)
app.use(mainURL + '/answer', answerRouter)
app.use(mainURL + '/result', resultRouter)

app.listen(port, () => {
    console.log(`This server running on port ${port}`)
})

export default app;