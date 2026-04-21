import { Post } from '../models/post.model.js';

const createPost = async (req,res) => {
  try {
    const {name, description, age} = req.body;
    if(!name || !description || !age){
      return res.status(400).json({message: "all fields are required"});
    }
    const post = await Post.create({name, description, age});
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({message: error.message});
  } 
};
const getPosts = async (req,res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const updatePost = async (req,res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req,res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { createPost ,getPosts, updatePost, deletePost };