const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {testConnection} = require('../helpers/connections.mongodb')

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unipue:  true,
        lowercase: true
    },
    password: {
        type: String,
        require:true
    }
},{
    timestamps: true
} )

module.exports = testConnection.model('users', UserSchema)