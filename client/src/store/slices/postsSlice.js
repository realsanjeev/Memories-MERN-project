import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
  const { data } = await api.fetchPost(id);
  return data;
});

export const getPosts = createAsyncThunk('posts/getPosts', async (page) => {
  const { data } = await api.fetchPosts(page);
  return data;
});

export const getPostsBySearch = createAsyncThunk('posts/getPostsBySearch', async (searchQuery) => {
  const { data } = await api.fetchPostsBySearch(searchQuery);
  return data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
  const { data } = await api.createPost(newPost);
  return data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
  const { data } = await api.updatePost(id, post);
  return data;
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
  const { data } = await api.likePost(id);
  return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await api.deletePost(id);
  return id;
});

export const commentPost = createAsyncThunk('posts/commentPost', async ({ value, id }) => {
  const { data } = await api.comment(value, id);
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    isLoading: true,
    currentPage: 1,
    numberOfPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload.post;
      })
      .addCase(getPostsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
      });
  },
});

export default postsSlice.reducer;
