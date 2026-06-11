import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { deepPurple } from '@mui/material/colors';
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: { main: deepPurple[500] },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  transitions: {
    create: (props) => props,
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      short: '200ms',
    },
  },
});
const styles = {
  appBar: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 1px 20px -1px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderRadius: 0,
    margin: '0 0 30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 40px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 4px 30px -1px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 0.95)',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '12px 20px',
      gap: '12px',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.5px',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  image: {
    marginLeft: '12px',
    marginTop: '4px',
    height: '40px',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '400px',
    gap: '12px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      width: '100%',
      maxWidth: '100%',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '12px',
    },
  },
  logout: {
    marginLeft: '16px',
    borderRadius: '8px',
    padding: '8px 20px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#1e293b',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandText: {
    height: '45px',
  },
  purple: {
    color: 'white',
    backgroundColor: deepPurple[500],
    width: '40px',
    height: '40px',
    fontSize: '1.25rem',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(94, 53, 177, 0.3)',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 16px rgba(94, 53, 177, 0.4)',
    },
  },
  button: {
    borderRadius: '8px',
    padding: '10px 24px',
    fontWeight: 500,
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(94, 53, 177, 0.3)',
    },
  },
};

const StyledAppBar = styled(AppBar)(styles.appBar);
const BrandContainerLink = styled(Link)(styles.brandContainer);
const PurpleAvatar = styled(Avatar)(styles.purple);
const StyledToolbar = styled(Toolbar)(styles.toolbar);
const Profile = styled("div")(styles.profile);
const StyledImage = styled("img")(styles.image);
const StyledBrandText = styled("img")(styles.brandText);
const UserName = styled(Typography)(styles.userName);
const LogoutButton = styled(Button)(styles.logout);

export { StyledAppBar,
  BrandContainerLink,
  StyledToolbar,
  StyledImage,
  PurpleAvatar,
  Profile,
  UserName,
  LogoutButton,
  StyledBrandText
};
