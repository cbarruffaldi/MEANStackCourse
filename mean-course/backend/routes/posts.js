const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const multer = require('multer');
const PostsController = require('../controllers/posts')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');

    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' +  Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({storage: storage}).single('image'), PostsController.createPost);

router.get('', PostsController.getPosts);

router.delete('/:id', checkAuth, PostsController.deletePost);

router.put('/:id', checkAuth, multer({storage: storage}).single('image'), PostsController.updatePost);

router.get('/:id', PostsController.getPost)

module.exports = router;
