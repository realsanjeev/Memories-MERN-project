import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log("getPosts method: ", page)

  try {
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log("get posts by search: ", req.query)
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

    res.status(200).json({ data: posts });

  } catch (error) {
    console.error("error in search", error.message)
    res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log("getpost: ", id)

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

  try {
    await newPostMessage.save();
    console.log("Successfully created post")

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    if (!result) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log('delete id: ', id)

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

// export const likePost = async (req, res) => {
//     const { id } = req.params;
//     console.log('like post: ', id)
//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id === String(req.userId));

//     if (index === -1) {
//         post.likes.push(req.userId);
//     } else {
//         post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
// }

export const likePost = async (req, res) => {
  const { id } = req.params;
  console.log('like post: ', id);

  try {
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    const post = await PostMessage.findById(id);

    if (!post) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    // Check if the userId is already in the likes array
    const isLiked = post.likes.includes(req.userId);

    if (isLiked) {
      // If the userId is already in the likes array, remove it
      post.likes.pull(req.userId);
    } else {
      // If the userId is not in the likes array, add it
      post.likes.addToSet(req.userId);
    }

    // Save the updated post with the new likes array
    const updatedPost = await post.save();
    // console.log(updatedPost);

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  console.log("Comment Post initiated", req.body, req.params);

  try {
    const { value } = req.body;

    if (!value || value.trim() === '') {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    const post = await PostMessage.findById(id);

    if (!post) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    // Fix race condition: use save() instead of findByIdAndUpdate
    post.comments.push(value);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};
export default router;