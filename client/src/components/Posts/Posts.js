import React from "react";
import useStyles from "./style";

const Posts = () => {
    const classes = useStyles()
    return(
        <div className={classes.mainContainer}>
            <h1>componenets Posts </h1>
        </div>
    )
};
export default Posts;