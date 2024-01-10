const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel');
// const comment = require('../models/commentModel');



exports.newComment = async (req, res) => {
    try {
        const id = req.params.id;

        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).json({
                message: 'Blog not found'
            })
        }
        const comment = new commentModel(req.body);

         if(!comment){
                return res.status({
                    error:"an error occcur"
                })
         
         }
        
        blog.comments.push(comment._id)
        comment.post = blog._id
        
        // console.log(comment._id);
        // console.log(comment._id);
        // post the comment into the comments field in the blog model
        // Save the changes into the database
        await blog.save();
        await comment.save();

        // Send a success response to the user
        res.status(201).json({
            message: 'Successfully posted a comment',
            data: comment
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await commentModel.findById(id)
        if(!comment){
            return res.status(404).json({
                message: 'Comment not found'
            })
        }
        res.status(200).json({
            message: 'Viewing comment',
            comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateComment = async (req,res)=>{
    try {
        const id = req.params.id;
        const {text} = req.body;
        const updatedComment = await commentModel.findByIdAndUpdate(id,{text},{new:true, runValidators:true});

        if(!updatedComment){
            return res.status(404).json({
                message:'Comment not found'
            });
        }
        res.status(200).json({
            message:'Comment updated',
            data:updatedComment
        })
    } catch (error) {
        
    }
}

exports.getAllComment = async (req, res) => {
  try {
    const id = req.params.id
    //find the comment

    const post = await blogModel.findById(id)

    if(!post){
        return res.status(400).json({
            message:"post does not exist"
        })
    }
    //

    res.status(200).json({
        message:`this post has ${post.comments.length} comments`,
        data: post.comments
    })
  } catch (error) {
    res.status(500).json({
        message:error.message
    })
  }
}

exports.deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await commentModel.findByIdAndDelete(id);
        if(!comment){
            return res.status(404).json({
                message: 'No comment found'
            })
        }
        res.status(200).json({
            message: 'Comments deleted successfully'
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAllComment = async (req, res) => {
    try {
        const id = req.params.id
        const allcomment = await commentModel.find();

        if(allcomment.length === 0){
            return res.status(404).json({
                message: 'No comments found'
            })
        }
        res.status(200).json({
            message: 'View all comments on this post',
            allcomment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}