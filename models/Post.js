const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {testConnection} = require('../helpers/connections.mongodb')

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    url:{
        type: String
    },
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 

})

module.exports = testConnection.model('posts', PostSchema)

