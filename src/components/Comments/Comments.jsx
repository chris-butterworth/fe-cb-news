import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getComments } from "../../../api";
import CommentCard from "./CommentsCard";
import CommentInput from "./CommentInput";
import { Box, Skeleton } from "@mui/material";

export default function Comments({ comments, setComments, user }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getComments(+article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((message) => {
        console.log(message);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading)
    return (
      <Box sx={{ margin: "auto", padding: "1rem" }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  if (isError) {
    return (
      <Alert severity="error" sx={{ m: 2, p: 2, boxShadow: 5 }}>
        <AlertTitle>An unexpected error has occurred</AlertTitle>
      </Alert>
    );
  }
  return (
    <div id="comments">
      <CommentInput setComments={setComments} article_id={article_id} />
      <div className="comments-area">
        {comments.length === 0 && (
          <p className="comments-area-non">Be the first to post a comment</p>
        )}
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              commentVotes={comment.votes}
            />
          );
        })}
      </div>
    </div>
  );
}
