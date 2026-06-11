import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { jwtDecode } from 'jwt-decode';

import { signin, signup, setAuthData } from '../../store/slices/authSlice';
import { StyledAvatar, StyledForm, StyledPaper, SubmitButton } from './styles';
import Input from './Input';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const googleSuccess = async (credentialResponse) => {
    const result = jwtDecode(credentialResponse.credential);
    const token = result?.token || credentialResponse?.credential;

    try {
      dispatch(setAuthData({ result, token }));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  autoComplete="given-name"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  autoComplete="family-name"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoComplete="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                autoComplete="new-password"
              />
            )}
          </Grid>
          <SubmitButton type="submit" fullWidth variant="contained" color="primary">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </SubmitButton>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
          </GoogleOAuthProvider>
          <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default SignUp;
