const mongoose = require('mongoose')

const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comments'
    }]
}, {
    timestamps: true
})


const blog = mongoose.model('blog', blogModel)

module.exports = blog