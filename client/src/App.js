<<<<<<< HEAD
import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import useStyles from './style';

import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form'
import getPosts from './actions/posts'

import memories from './images/memories.jpg';

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
        <Container maxidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">
                    Hello
                </Typography>
                <img className={classes.img} src={memories} alt="memories" height='60px' />
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
=======
import React from "react";
const App = () => {
    return (
        <div>
            <h1>App</h1>
        </div>
>>>>>>> parent of d1c0f4d (adding src/style.js in project)
    )
}

export default App;