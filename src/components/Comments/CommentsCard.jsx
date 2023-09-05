export default function CommentCard({ comment }) {
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
            <button>-</button>
            <strong>{comment.votes}</strong>
            <button>+</button>
          </div>
        </div>
      </div>
    </li>
  );
}
