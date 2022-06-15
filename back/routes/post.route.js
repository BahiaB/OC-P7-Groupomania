const express = require('express');
const auth = require("../middleware/auth.middleware")

const postCtrl = require('../controllers/post.controller');

const router = express.Router();

router.post('/', auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/comments", auth, postCtrl.getComments);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost );
module.exports = router; 