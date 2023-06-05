import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import { Grid } from "@mui/material";

const styles = {
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
};

const StyledGrid = styled(Grid)(styles.mainContainer);
export { StyledGrid };