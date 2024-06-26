import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// CREATE Post
export const createPost = async (req, resp) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(mongoose.Types.ObjectId(userId));
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: new Map(),
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    resp.status(201).json(posts);
  } catch (error) {
    resp.status(409).json({ message: error.message });
  }
};



/* READ */

// get all post
export const getFeedPosts = async (req, resp) => {
  try {
    const posts = await Post.find();
    resp.status(200).json(posts);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

// get user post
export const getUserPosts = async (req, resp) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    resp.status(200).json(posts);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

/* UPDATE */

export const likePost = async (req, resp) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(mongoose.Types.ObjectId(id));

  if (!post.likes) {
    post.likes = new Map();
  }

  const isLiked = post.likes.get(userId);
  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    { likes: post.likes },
    { new: true }
  );
  resp.status(200).json(updatedPost);
};


