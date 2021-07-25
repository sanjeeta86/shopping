const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema

const productSchema = new Schema({
    Media: {
        type: String
    },
    Title: {
        type: String,
    },
    Description :{
        type:String
    },
    Status: {
        type:String,
        enum: ['open', 'in progress', 'completed'] 
    }

}, { timestamps: true })

const Product = mongoose.model('productcloud', productSchema)
module.exports = Product



