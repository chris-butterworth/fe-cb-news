import { patchCommentVotes } from "../../../api";
import { useEffect, useState } from "react";

export default function CommentCard({ comment, commentVotes }) {
  const [votes, setVotes] = useState(commentVotes);

  const handleVote = (event, vote) => {
    event.preventDefault();
    patchCommentVotes(comment.comment_id, vote).catch(() => {
      alert("your comment could not be added");
    });
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
  };
  return (
    <li className="comment-card">
      <div className="comment-credit-bar">
        <strong>{comment.author}</strong>
        <span>{comment.created_at}</span>
      </div>

      <div className="comment-content">
        <div className="comment-body">
          <p>{comment.body}</p>
        </div>
        <div className="comment-action-bar">
          <div className="comment-action-bar-votes">
            <button
              onClick={(event) => {
                handleVote(event, -1);
              }}
            >
              -
            </button>
            <strong>{votes}</strong>
            <button
              onClick={(event) => {
                handleVote(event, 1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
