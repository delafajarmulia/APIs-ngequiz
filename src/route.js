import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import {router as userController } from './features/user-auth/user.route.js'

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(cors())

app.use(express.json())

const mainURL = '/api/v1'

app.use(mainURL + '/user/auth', userController)

app.listen(port, () => {
    console.log(`This server running on port ${port}`)
})