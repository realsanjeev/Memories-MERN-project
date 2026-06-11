import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

import { createPost, updatePost } from '../../store/slices/postsSlice';
import {
  RootContainer,
  StyledPaper,
  FormContainer,
  FileInput,
  SubmitButton,
} from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const clear = useCallback(() => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }, [setCurrentId]);

  const getPostById = (state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null;

  const post = useSelector(getPostById);

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post, clear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await dispatch(
        createPost({ ...postData, name: user?.result?.name })
      ).unwrap();
      if (result?._id) {
        navigate(`/posts/${result._id}`, { replace: true });
      }
    } else {
      dispatch(updatePost({ id: currentId, post: { ...postData, name: user?.result?.name } }));
    }
    clear();
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  if (!user?.result?.name) {
    return (
      <StyledPaper elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other&apos;s memories.
        </Typography>
      </StyledPaper>
    );
  }

  return (
    <RootContainer>
      <StyledPaper elevation={6}>
        <FormContainer autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">
            {currentId ? `Editing "${post?.title}"` : 'Creating a memory'}
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            autoComplete="off"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            autoComplete="off"
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
          <div style={{ padding: '5px 0', width: '94%' }}>
            {postData.tags.map((tag) => (
              <Chip
                key={tag}
                variant="outlined"
                label={tag}
                onDelete={() => handleDeleteChip(tag)}
              />
            ))}
          </div>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags (comma separated)"
            fullWidth
            autoComplete="off"
            value={postData.tags.join(',')}
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
          />
          <FileInput>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    setPostData({ ...postData, selectedFile: reader.result });
                  reader.readAsDataURL(file);
                }
              }}
            />
          </FileInput>
          <SubmitButton variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </SubmitButton>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </FormContainer>
      </StyledPaper>
    </RootContainer>
  );
};

export default Form;
