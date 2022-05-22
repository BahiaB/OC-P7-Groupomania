const express = require('express');
const auth = require("../middleware/auth.middleware")

const postCtrl = require('../controllers/post.controller');

const router = express.Router();

router.post('/', auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.put("/:id", auth, postCtrl.updatePost);
module.exports = router; 