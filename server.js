const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRouter = require('./routes/blogRouter');
const commentRouter = require('./routes/commentRouter');

const app = express()
app.use(express.json())
app.use('/api/v1', blogRouter);
app.use('/api/v1', commentRouter);


const url = process.env.ATLAS_LOGIN


mongoose.connect(url).then(() => {
    console.log('Connection to database successful');
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening to port: ${process.env.PORT}`);
    })
})