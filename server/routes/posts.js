import express from 'express';

import { getPosts, 
    getPost, 
    createPost, 
    updatePost, 
    likePost, 
    deletePost, 
    getPostsBySearch} from '../controllers/posts.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/search', getPostsBySearch)
router.get('/:id', getPost);
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;