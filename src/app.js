const express = require('express')

const app = new express()

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(cors())

const mainRouter = require('./routes/mainRouter')
app.use('/', mainRouter)

module.exports = app