import { AppBar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const styles = {
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0, 183, 255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
};

const StyledAppBar = styled(AppBar)(styles.appBar);
const StyledTypography = styled(Typography)(styles.heading);
const ImageContainer = styled('img')(styles.image);

export { StyledAppBar, StyledTypography, ImageContainer};

