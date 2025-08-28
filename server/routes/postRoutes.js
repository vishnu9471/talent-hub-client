import express from "express";
import * as postController from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post('/', verifyToken, postController.createPost);

router.get('/', verifyToken, postController. getPosts);

router.get('/videos', postController.getAllVideos);




router.delete('/:id', verifyToken, postController.deletePost);

export default router;

