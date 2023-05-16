import React, { useEffect, useState } from 'react';
import axios from "axios";
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id/likePost}`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

const MyApiComponent = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkAPIConnection = async () => {
      try {
        await axios.get("http://localhost:5000/posts");
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkAPIConnection();
  }, []);

  return (
    <div>
      {isConnected ? (
        <p>API connection successful</p>
      ) : (
        <p>API connection failed</p>
      )}
    </div>
  );
};
export default MyApiComponent;