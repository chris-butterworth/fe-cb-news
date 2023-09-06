import { patchCommentVotes } from "../../../api";
import { useState } from "react";
import { timeSince } from "../../../utils";

export default function CommentCard({ comment, commentVotes }) {
  const [votes, setVotes] = useState(commentVotes);

  const handleVote = (event, vote) => {
    event.preventDefault();
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
    patchCommentVotes(comment.comment_id, vote).catch(() => {
      alert("your vote could not be added at this time");
    });
  };
  return (
    <li className="comment-card">
      <div className="comment-credit-bar">
        <strong>{comment.author}</strong>
        <span>&ensp;</span>
        <span>{timeSince(comment.created_at)}</span>
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
