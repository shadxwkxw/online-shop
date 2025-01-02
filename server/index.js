require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const static = require('node:path')

const PORT = process.env.PORT || 5000

const App = express()
App.use(cors())
App.use(express.json())
App.use(express.static(static.resolve(__dirname, 'static')))
App.use(fileUpload({}))
App.use('/api', router)

App.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        App.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()