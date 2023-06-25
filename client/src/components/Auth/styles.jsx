import { styled } from "@mui/material/styles";
import { spacing } from "@mui/system";
import { Avatar, Button, Paper } from '@mui/material';
import { red } from "@mui/material/colors";

const styles = {
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: spacing(1),
    },
  },
  avatar: {
    margin: spacing(1),
    backgroundColor: red[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: spacing(3),
  },
  submit: {
    margin: spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: spacing(2),
  },
};

const StyledPaper = styled(Paper)(styles.paper);
const StyledAvatar = styled(Avatar)(styles.avatar);
const StyledForm = styled('form')(styles.form);
const SubmitButton = styled(Button)(styles.submit);
const GoogleSignButton = styled(Button)(styles.googleButton);

export { StyledPaper, StyledAvatar, StyledForm, SubmitButton, GoogleSignButton }