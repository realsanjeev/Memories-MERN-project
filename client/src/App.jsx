import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import MyApiComponent from "./api/index";
import { getPosts } from "./actions/posts";

import memories from "./images/memories.jpg";

import { StyledAppBar, StyledTypography, ImageContainer } from "./style";
const App = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
      
<Container maxWidth="lg">
< MyApiComponent />
      <StyledAppBar position="static" color="inherit">
        <StyledTypography variant="h2" align="center">Memories</StyledTypography>
        <ImageContainer src={memories} alt="icon" height="60" />
      </StyledAppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    )
    }

export default App;