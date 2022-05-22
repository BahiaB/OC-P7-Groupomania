const express = require('express');
const auth = require("../middleware/auth.middleware")
const router = express.Router();

const userCtrl = require('../controllers/user.controller');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


router.get('/:id', auth ,userCtrl.userInfo);
router.put('/:id', auth ,userCtrl.updateUser);
module.exports = router; 