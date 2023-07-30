import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { StyledAppBar, 
    StyledTypography, 
    StyledToolbar,
    StyledImage,
    PurpleAvatar,
    UserName, 
    BrandContainer, 
    Profile } from "./styles";
import * as actionType from "../../constants/actionTypes";
import memories from "../../images/memories.jpg";
import MyApiComponent from "../../api";

export default function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT })
        navigate("/auth", { replace: true });
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
          const decodedToken = decode(token);
          console.log(token)
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")))
        // eslint-disable-next-line
      }, [location, user?.result?.email]);

    return (
        <StyledAppBar position="static" color="inherit">
          <MyApiComponent/>
          <BrandContainer>
            <StyledTypography component={Link} to="/" variant="h2" align="center">Memories</StyledTypography>
            <StyledImage src={memories} alt="icon" height="60" />
          </BrandContainer>
          <StyledToolbar>
            {user?.result ? (
              <Profile>
                <PurpleAvatar alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0).toUpperCase()}</PurpleAvatar>
                <UserName variant="h6">{user?.result.name}</UserName>
                <Button variant="contained" className="logout" color="secondary" onClick={logout}>Logout</Button>
              </Profile>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
          </StyledToolbar>
        </StyledAppBar>
      );
    };
