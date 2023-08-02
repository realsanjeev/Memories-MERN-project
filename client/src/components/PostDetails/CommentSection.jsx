import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";


import { commentPost } from "../../actions/posts";
import { TextField, Typography, Button } from "@mui/material";
import { CommentsInnerContainer, CommentsOuterContainer } from "./styles";

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleComment = async ( post ) => {
        const newComments = await dispatch(commentPost(`${user?.result?.name}`, post._id));

        setComment("");
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <CommentsOuterContainer>
                <CommentsInnerContainer>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(": ")[0]}</strong>
                            {c.split(":")[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </CommentsInnerContainer>
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant="h6">Write a comment</Typography>
                    <TextField fullWidth 
                    rows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <br />
                    <Button 
                    style={{ marginTop: '10px' }} 
                    fullWidth 
                    disabled={!comment.length}
                    color='primary'
                    variant="contained"
                    onClick={handleComment}>
                        Comment
                    </Button>
                </div>
            </CommentsOuterContainer>
        </div>
    );
};

export default CommentSection;

