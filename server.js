const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { result } = require('lodash')
require('dotenv').config()

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public/images'))


app.use('/api/products', require('./routers/productRoute'))






const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`SERVER is RUNNING ON PORT ${PORT}`)
    mongoose.connect(`mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserpass}@education-mlljb.mongodb.net/${process.env.mongodatabase}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        },
        () => {
            console.log('Database Connected...')
        });
})
