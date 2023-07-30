import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    console.log("getPosts method: ", page)

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    console.log("get poats by search: ", searchQuery)
    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.status(200).json({ data: posts });
        
    } catch (error) {
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
    console.log("Creating post", post);
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log("Updating post", id)
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
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
  
      const post = await PostMessage.findOneAndUpdate(
        { _id: id },
        { $addToSet: { likes: req.userId } }, // Add userId to the likes array if it doesn't exist
        { new: true }
      );
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  };
export default router;