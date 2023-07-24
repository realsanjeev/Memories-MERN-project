import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/system";
import { Grid } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: deepPurple[500],
  },
});

const styles = {
  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0, 183, 255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: theme.palette.primary,
    backgroundColor: deepPurple[500],
  },
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    appBar: {
      padding: '10px 20px',
    },
    heading: {
      display: 'none',
    },
    userName: {
      display: 'none',
    },
    image: {
      marginLeft: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },

  actionDiv: {
    textAlign: 'center',
  },
};

const StyledGrid = styled(Grid)(styles.mainContainer);
export { StyledGrid };
