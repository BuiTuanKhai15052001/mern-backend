
const mongoose = require('mongoose');
require('dotenv').config();


function newConnection(uri){
    console.log(uri);

    const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    conn.on('connected', function(){
        console.log(`MongoDB::: connect::: ${this.name}`);
    })
    conn.on('disconnect', function(){
        console.log(`MongoDB::: disconnect::: ${this.name}`);
    })
    conn.on('error', function(error){
        console.log(`MongoDB::: connect::: ${JSON.stringify(error)}`);
    })
    return conn;
}

const testConnection = newConnection(process.env.URI_MONGODB_TEST);

module.exports = {testConnection}
