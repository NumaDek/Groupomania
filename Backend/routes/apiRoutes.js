const express = require('express');
const controller = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const router = express.Router('');

// CREATE
router.post('/', /*auth, */multer, controller.create);
// READ
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getOne);
// UPDATE
router.put('/:id', auth, multer, controller.update);
router.post('/like', auth, controller.like);
// DELETE
router.delete('/:id', auth, controller.delete);

module.exports = router;