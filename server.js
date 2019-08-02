//import packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//create server
const app = express()

//save crederntials on .env file with dotnev
require('dotenv').config()

//import Routes
const foodsRouter = require('./routes/foods')
const indexRouter = require('./routes/index')

//middleware
app.use(express.json())
app.use('/', indexRouter)
app.use('/api/v1/', foodsRouter)

//Set up default mongoose connection
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })

//Get the default connection
const db = mongoose.connection

//Bind connection to succesfull event
db.once('open', () => {
	console.log('MongoDB database connection established successfully')
}).on('error', console.error.bind(console, 'MongoDB connection error:'))
//Bind connection to error event (to get notification of connection errors)

//listening to port
const port = process.env.PORT || 5000
app.listen(port, () =>
	console.log(`Listening on port http://localhost:${port}`)
)
