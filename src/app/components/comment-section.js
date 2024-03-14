import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const CommentSection = ({ comments, eventId, userId }) => {
  const [commentText, setCommentText] = useState("");
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);

  const addComment = useMutation(api.comment.post);
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      const comment = await addComment({
        content: commentText,
        eventID: eventId,
        user: userId,
        likes: 0,
      });
      console.log(comment);
      setCommentText("");
    }
  };
  // get user info
  const { fullName, imageUrl } = useUser().user;

  return (
    <Paper style={{ margin: "auto", marginTop: "1rem", padding: "1rem" }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        {comments.length} Comments
      </Typography>
      <form
        style={{ display: "flex", alignItems: "flex-end" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <CommentAvatar name={fullName} imageUrl={imageUrl} />
        <TextField
          label="Add a comment"
          value={commentText}
          onChange={handleCommentChange}
          rows={3}
          variant="standard"
          onFocus={() => setIsTextFieldFocused(true)}
          style={{ flexGrow: 1 }}
        />
        {isTextFieldFocused && (
          <Button variant="text" color="primary" onClick={handleSubmitComment}>
            Comment
          </Button>
        )}
      </form>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} style={{ padding: 0, marginTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <CommentAvatar />
              <ListItemText primary={comment.content} />
            </div>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const CommentAvatar = ({ name, imageUrl }) => {
  return imageUrl ? (
    <Avatar alt={name} src={imageUrl} sx={{ width: 32, height: 32, marginRight: "0.5rem" }} />
  ) : (
    <Avatar sx={{ width: 32, height: 32, marginRight: "0.5rem" }}>
      <AccountCircle />
    </Avatar>
  );
};
export default CommentSection;
