import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/system";
import { Grid } from "@mui/material";

const theme = createTheme({
  spacing: 4,
})
const styles = {
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
};

const StyledGrid = styled(Grid)(styles.mainContainer);
export { StyledGrid };