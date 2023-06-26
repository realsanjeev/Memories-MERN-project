import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import { Avatar, Button, Paper } from '@mui/material';
import { red } from "@mui/material/colors";

const styles = {
  paper: {
    marginTop: "8px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "9px",
  },
  root: {
    '& .MuiTextField-root': {
      margin: "3px",
    },
  },
  avatar: {
    margin: "3px",
    backgroundColor: red[500],
  },
  form: {
    width: '100%',
    marginTop: "3px",
  },
  submit: {
    margin: "3px 0 2px",
  },
  googleButton: {
    marginBottom: "5px",
  },
};

const StyledPaper = styled(Paper)(styles.paper);
const StyledAvatar = styled(Avatar)(styles.avatar);
const StyledForm = styled('form')(styles.form);
const SubmitButton = styled(Button)(styles.submit);
const GoogleSignButton = styled(Button)(styles.googleButton);

export { StyledPaper, StyledAvatar, StyledForm, SubmitButton, GoogleSignButton }