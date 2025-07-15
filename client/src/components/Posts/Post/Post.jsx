import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
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
    StyledCardActions,
    StyledButtonBase
} from "./styles";

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = user?.result?.sub || user?.result?._id;

    const handleLike = async () => {
        dispatch(likePost(post._id));
    };

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === userId)
                ? (
                    <>
                        <ThumbUpIcon fontSize="small" />
                        &nbsp;{post.likes?.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpOffAltIcon fontSize="small" />
                        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
                    </>
                )
        }

        return (
            <>
                <ThumbUpOffAltIcon fontSize="small" />&nbsp;Like
            </>
        )
    }

    const openPost = (e) => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <StyledCard raised elevation={6} sx={{ maxWidth: 650 }}>
            <StyledButtonBase component="span" name="test" onClick={openPost}
            >
                <StyledCardMedia image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} sx={{ height: 69 }} />
                <Overlay>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </Overlay>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Overlay2 name="edit">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                            style={{ color: "white" }}
                            size="small"
                        >

                            <MoreHorizIcon fontSize="large" />
                        </Button>
                    </Overlay2>
                )}
                <Details>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </Details>

                <StyledTitle gutterBottom variant="h5" component="h2">
                    {post.title}
                </StyledTitle>
                <CardContent sx={{ paddingTop: 0 }}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.message.length > 100 ? `${post.message.substring(0, 100)}...` : post.message}
                    </Typography>
                </CardContent>
            </StyledButtonBase>
            <StyledCardActions>
                <Button size="small" color="primary" disabled={!user?.result}
                    onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />Delete
                    </Button>
                )}

            </StyledCardActions>
        </StyledCard>
    );
};

export default Post;