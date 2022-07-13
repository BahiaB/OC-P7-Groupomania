const express = require('express');
const auth = require("../middleware/auth.middleware")
const multer = require("../middleware/multer-config")
const postCtrl = require('../controllers/post.controller');

const router = express.Router();

router.post('/', auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.delete("/:id", auth, postCtrl.deletePost );
router.get("/:id", postCtrl.getComments)
router.post("/comment", auth, postCtrl.createComment)
router.post('/like', auth, postCtrl.addLike)
router.delete("/comment/:id", auth, postCtrl.deleteComment);
router.get('/user-posts/:id', auth, postCtrl.getPostsFromUser)
router.put('/modifypost/:id', auth, multer, postCtrl.modifyPost)
module.exports = router; 