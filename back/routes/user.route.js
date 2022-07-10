const express = require('express');
const auth = require("../middleware/auth.middleware")
const multer = require('../middleware/multer-config')
const router = express.Router();
const userCtrl = require('../controllers/user.controller');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth ,userCtrl.userInfo);
router.put('/:id', auth, multer, userCtrl.updateUser)
router.delete('/:id', auth, userCtrl.deleteUser)
router.get('/', auth, userCtrl.searchUser)
module.exports = router; 