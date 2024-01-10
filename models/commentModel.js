const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
    name:{
        type:String
    },
    comment: {
        type: String
    },


    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    }
}, {
    timestamps: true
})


const comment = mongoose.model('comments', commentModel)

module.exports = comment