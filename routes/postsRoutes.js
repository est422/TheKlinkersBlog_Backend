const router = require('express').Router();
// const { verifyToken } = require('../controllers/authentication');
const multer = require('multer');
const { verifyToken } = require('../controllers/authorization');
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  });
  
const upload = multer({ storage: storage});
//Import posts controller
const postsControllers = require('../controllers/postsControllers');

//Get all posts
router.get('/', postsControllers.getAllPosts);

//Get post by id
router.get('/:id', postsControllers.getPost);

//Get post by category
router.get('/getPostsByCategory/:category', postsControllers.getPostsByCategory);

//Post post
router.post('/create', verifyToken, upload.single('postImage'), postsControllers.createPost);

//Put post
router.put('/update/:id', verifyToken, postsControllers.editPost);

//Put post likes
router.put('/update/like/:id', postsControllers.editPostLike);

//Put post dislikes
router.put('/update/dislike/:id', postsControllers.editPostDislike);

//Delete post
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;