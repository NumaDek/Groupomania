const express = require('express');
const controller = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const router = express.Router('');

// CREATE
router.post('/', auth, multer, controller.create);
router.post('/comments/:id', auth, multer, controller.createComment);
// READ
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getOne);
router.get('/profile/:id', auth, controller.getMine);
router.get('/comments/:id', auth, controller.getComments);
// UPDATE
router.put('/:id', auth, multer, controller.update);
router.post('/like', auth, controller.like);
router.post('/comments/like/:id', auth, controller.commentLike);
// DELETE
router.delete('/:id', auth, controller.delete);

module.exports = router;