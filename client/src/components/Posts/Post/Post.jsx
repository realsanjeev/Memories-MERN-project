import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CardContent, Button, Typography } from "@mui/material";

import { likePost, deletePost } from "../../../actions/posts";
import { 
    StyledCard, 
    StyledCardMedia,
    Overlay,
    Overlay2,
    Details,
    StyledTitle,
    StyledCardActions
} from "./style";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();

    return (
        <StyledCard>
            <StyledCardMedia image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
         <Overlay>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </Overlay>
            <Overlay2>
                <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </Overlay2>
            <Details>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {post.tags.map((tag) => `#${tag}`)}
                </Typography>
            </Details>
            <StyledTitle gutterBottom variant="h5" component="h2">
                {post.title}
            </StyledTitle>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <StyledCardActions>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpIcon fontSize="small" /> Like {post.likePost}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> Delete
                </Button>

            </StyledCardActions>
        </StyledCard>
    )
};
export default Post;