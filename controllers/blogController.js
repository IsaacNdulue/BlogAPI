const blogModel = require('../models/blogModel')

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = await blogModel.create({
            title,
            content
        })
        console.log('New Post', newPost)
        
        res.status(201).json({
            message: 'Created successfully',
            data: newPost 
        })
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findById(id).populate('comments')
        if(!blog){
            return res.status(404).json({
                message: 'Blog not found'
            })
        }
        res.status(200).json({
            message: 'Viewing blog post',
            blog
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({
                message: 'Blog not found'
            })
        }
        res.status(200).json({
            message: 'Blog post deleted'
        })
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.updatePost = async (req,res)=>{
    try {
        const id = req.params.id;
        const {title,content} = req.body;

        const updatedPost = await blogModel.findByIdAndUpdate(id, {title,content}, {new: true, runValidators:true});

        if(!updatedPost){
            return res.status(404).json({
                message:'Blog not found'
            });
        }
        res.status(200).json({
            message:'Blog post updated',
            data: updatedPost
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};

exports.getAll = async (req,res)=>{
    try {
        const allPosts = await blogModel.find().populate('comments');
        
        res.status(200).json({
            message:'All blog posts retrieved',
            data:allPosts
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};