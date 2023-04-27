import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import useStyles from './style';

import Posts from '/workspaces/Mongodb-project/client/src/components/Posts/Posts.js';
import Form from '/workspaces/Mongodb-project/client/src/components/Form/Form'

import memories from '/workspaces/Mongodb-project/client/src/images/memories.jpg';

const App = () => {
    const classes = useStyles()
    return (
        <Container maxidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">
                    Hello
                </Typography>
                <img className={classes.img} src={memories} alt="memories" height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid justify="space-between" spacing="1.5">
                        <Grid item xs={12} sm={7}>

                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={7}>

                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;