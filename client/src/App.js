import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
// import { useDispatch } from "react-redux";

import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form';
// import getPosts from './actions/posts';

import memories from './images/memories.jpg';

import useStyles from './style';
const App = () => {
    const classes = useStyles()
    console.log(classes)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getPosts())
    // }, [dispatch])
    return (
        <Container maxidth='lg'>
            <h1 className={classes.appBar}>hi</h1>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">
                    Hello
                </Typography>
                <img className={classes.img} src={memories} alt="memories" height='60px' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid justify="space-between" container spacing="1.5">
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