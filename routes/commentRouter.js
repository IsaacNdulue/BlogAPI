const express = require('express')
const { newComment, getOne, updateComment, getAllComment, deleteComment } = require('../controllers/commentController')


const router = express.Router();

router.post('/newcomment/:id', newComment);

router.get('/onecomment/:id', getOne);

router.post('/update/:id', updateComment)

router.get('/getallcomment/:id', getAllComment)

router.delete('/deletecomment/:id', deleteComment)


module.exports = router