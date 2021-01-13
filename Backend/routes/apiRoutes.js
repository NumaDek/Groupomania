const express = require('express');
const controller = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const router = express.Router('');

// CREATE
router.post('/', auth, multer, controller.createPost);
router.post('/comments/:id', auth, multer, controller.createComment);
// READ
router.get('/', auth, controller.getAllPost);
router.get('/one/:id', auth, controller.getOne);
router.get('/profile/:id', auth, controller.getMine);
router.get('/comments/:id', auth, controller.getComments);
// UPDATE
router.post('/like', auth, controller.like);
router.post('/comments/like/:id', auth, controller.commentLike);
// DELETE
router.delete('/delete/:id', auth, controller.deletePost);
router.delete('/comment/delete/:id', auth, controller.deleteComment);
module.exports = router;