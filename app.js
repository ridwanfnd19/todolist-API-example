const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const port = 8000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.status(200).send({
        status: true,
        message: 'Halo ini API dari TodoList Prisma'
    })
})

routes(app)

app.listen(port, () => {
    console.log(`Server running di http://localhost:${port}`)
})

