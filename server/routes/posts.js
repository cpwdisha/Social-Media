import express from "express";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

/* READ */
/* this is the home page it will have all the post  */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
/* Liking and unLiking a Post */
router.patch("/:id/like", verifyToken, likePost);

export default router;
