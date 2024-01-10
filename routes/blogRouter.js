const express = require('express')
const { createPost, getOne, deleteOne, updatePost, getAll } = require('../controllers/blogController');



const router = express.Router()

router.post('/newblog', createPost);

router.get('/oneblog/:id', getOne);
router.get('/updateblog/:id', updatePost);
router.get('/getall', getAll);


router.delete('/oneblog/:id', deleteOne);




module.exports = router