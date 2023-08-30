const router = require('express').Router();
// const { verifyToken } = require('../controllers/authentication');

//Import posts controller
const postsControllers = require('../controllers/postsControllers');

//Get all posts
router.get('/', postsControllers.getAllPosts);

//Get post by id
router.get('/:id', postsControllers.getPost);

//Post post
router.post('/create', postsControllers.createPost);

//Put post
router.put('/update/:id', postsControllers.editPost);

//Delete post
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;