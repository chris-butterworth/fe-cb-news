import { deleteComment, patchCommentVotes } from "../../../api";
import { useContext, useState } from "react";
import { timeSince } from "../../../utils";
import { Context } from "../contexts/Contexts";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export default function CommentCard({ comment, commentVotes }) {
  const [votes, setVotes] = useState(commentVotes);
  const [hidden, setHidden] = useState(false);
  const { user } = useContext(Context);

  const handleVote = (event, vote) => {
    event.preventDefault();
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
    patchCommentVotes(comment.comment_id, vote).catch(() => {
      setVotes((currVotes) => {
        currVotes -= vote;
        return currVotes;
      });
      alert("your vote could not be added at this time");
    });
  };

  const handleDeleteComment = (event) => {
    event.preventDefault();
    setHidden(true);
    deleteComment(comment.comment_id).catch(() => {
      setHidden(false);
      alert("your comment could not be removed at this time");
    });
  };
  return (
    <Card sx={{ display: hidden ? "none" : "block", boxShadow: 3, mb: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography gutterBottom>{comment.author}</Typography>
        <Typography color="text.secondary" gutterBottom>
          {timeSince(comment.created_at)}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          p: 1,
          pt: 0,
          pb: 0,
        }}
      >
        <Typography>{comment.body}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            onClick={(event) => {
              handleVote(event, -1);
            }}
          >
            <ThumbDown />
          </Button>
          <strong>{votes}</strong>
          <Button
            onClick={(event) => {
              handleVote(event, 1);
            }}
          >
            <ThumbUp />
          </Button>
        </Box>

        {user.username === comment.author &&
          typeof comment.comment_id !== "string" && (
            <Button
              onClick={(event) => {
                handleDeleteComment(event);
              }}
            >
              X
            </Button>
          )}
      </CardActions>
    </Card>
  );
}
