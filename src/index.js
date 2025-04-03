const express = require('express')
const app = express()
const port = process.env.PORT

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`This server running on port ${port}`)
})