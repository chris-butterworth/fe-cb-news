import { deleteComment, patchCommentVotes } from "../../../api";
import { useContext, useState } from "react";
import { timeSince } from "../../../utils";
import { UserContext } from "../contexts/Contexts";

export default function CommentCard({ comment, commentVotes }) {
  const [votes, setVotes] = useState(commentVotes);
  const [hidden, setHidden] = useState("");
  const { user } = useContext(UserContext);

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

  const handleDeleteComment = (event) => {
    event.preventDefault();
    setHidden("hidden");
    if (typeof comment.comment_id === "number") {
      deleteComment(comment.comment_id).catch(() => {
        setHidden("");
        alert("your comment could not be removed at this time");
      });
    }
  };
  return (
    <li className={`comment-card ${hidden}`}>
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
          {user === comment.author && (
            <button
              onClick={(event) => {
                handleDeleteComment(event);
              }}
            >
              X
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
