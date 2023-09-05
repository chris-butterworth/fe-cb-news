import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getComments } from "../../../api";
import CommentCard from "./CommentsCard";

export default function Comments({ comments, setComments }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getComments(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An unexpected error has occurred</p>;
  if (comments.length === 0)
    return (
      <div>
        <h3>Comment Input Box</h3>
        <input></input>
        <p>Be the first to post a comment</p>
      </div>
    );
  return (
    <div className="">
      <h3>Comment Input Box</h3>
      <input></input>
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
  );
}
