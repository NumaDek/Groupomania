const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/admin', auth, userCtrl.getProfiles);
router.delete('/delete/:id', auth, userCtrl.deleteProfile);

module.exports = router;