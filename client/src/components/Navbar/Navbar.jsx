import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { logout } from '../../store/slices/authSlice';
import {
  StyledAppBar,
  StyledToolbar,
  StyledImage,
  PurpleAvatar,
  UserName,
  BrandContainerLink,
  Profile,
  LogoutButton,
  StyledBrandText,
} from './styles';
import memoriesText from '../../images/memoriesText.png';
import memoriesLogo from '../../images/memoriesLogo.png';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth', { replace: true });
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledAppBar position="static" color="inherit">
      <BrandContainerLink to="/">
        <StyledBrandText src={memoriesText} alt="icon" height="45px" />
        <StyledImage src={memoriesLogo} alt="icon" height="40px" />
      </BrandContainerLink>
      <StyledToolbar>
        {user?.result ? (
          <Profile>
            <PurpleAvatar alt={user?.result.name} src={user?.result.picture}>
              {user?.result.name.charAt(0).toUpperCase()}
            </PurpleAvatar>
            <UserName variant="h6">{user?.result.name}</UserName>
            <LogoutButton variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </LogoutButton>
          </Profile>
        ) : (
          <LogoutButton component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </LogoutButton>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
