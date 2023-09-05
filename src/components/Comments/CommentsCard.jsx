export default function CommentCard({ comment }) {
    const bodyShortner = (body) => {
      if (body.length < 100) {
        return body;
      } else {
        return (
          <>
            {body.slice(0, 100)}...
            <br />
            <a href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              View full post
            </a>
          </>
        );
      }
    };

  
    return (
      <li className="articles-card">
        <div className="articles-credit-bar">
          <strong>{comment.author}</strong>
          <span>{comment.created_at}</span>
        </div>
  
        <div className="articles-content">
          <div className="articles-heading">
            <h3>{comment.title}</h3>
          </div>
          <div className="">
            <p>{bodyShortner(comment.body)}</p>
          </div>
          <div className="articles-action-bar">
            <div className="articles-action-bar-votes">
              <button>-</button>
              <strong>{comment.votes}</strong>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
  