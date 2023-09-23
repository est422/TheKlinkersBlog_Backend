const router = require('express').Router();
// const { verifyToken } = require('../controllers/authentication');
const multer = require('multer');
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
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

//Post post
router.post('/create', upload.single('postImage'), postsControllers.createPost);

//Put post
router.put('/update/:id', postsControllers.editPost);

//Delete post
router.delete('/delete/:id', postsControllers.deletePost);

module.exports = router;