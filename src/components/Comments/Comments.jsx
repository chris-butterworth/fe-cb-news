import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getComments } from "../../../api";
import CommentCard from "./CommentsCard";
import CommentInput from "./CommentInput";

export default function Comments({ comments, setComments, user }) {
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

  return (
    <div className="">
      <CommentInput
        setComments={setComments}
        user={user}
        article_id={article_id}
      />
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
