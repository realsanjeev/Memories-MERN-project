import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

import useStyles from "./style";

const Form = () => {
    const classes = useStyles();
    return(
        <Paper className={classes.Paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant="h6">
                    ok
                </Typography>
                <TextField name="author" varient="outlined" label="Author" fullWidth />
                <TextField name="title" varient="outlined" label="Titled" fullWidth />
                <TextField name="message" varient="outlined" label="Message" fullWidth multiline/>
                <TextField name="tags" varient="outlined" label="Tags (comma separated)" fullWidth />
                <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button> 
            </form>
        </Paper>
    )
}

export default Form;