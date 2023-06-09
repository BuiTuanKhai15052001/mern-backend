const express = require('express')
const app = express()
const PORT = 5000;
const bodyParser = require('body-parser')
const createError = require('http-errors');
const UserRoute = require('./routes/auth');
const PostRoute = require('./routes/post');
const cors = require('cors')
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(cors())
app.use('/api/auth', UserRoute);
app.use('/api/posts', PostRoute);

app.use((req, res, next) => {
    next(createError.NotFound('This routes is not exists'))
})
app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})