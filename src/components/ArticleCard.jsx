export default function ArticleCard({ article }) {
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
        <strong>{article.author}</strong>
        <span>{article.created_at}</span>
      </div>

      <div className="articles-img-thumbnail">
        <img src={article.article_img_url} />
      </div>

      <div className="articles-content">
        <div className="articles-heading">
          <h3>{article.title}</h3>
        </div>
        <div className="articles-body">
          <p>{bodyShortner(article.body)}</p>
        </div>
        <div className="articles-action-bar">
          <div className="articles-action-bar-votes">
            <button>-</button>
            <strong>{article.votes}</strong>
            <button>+</button>
          </div>
          <button>💬 {article.comment_count}</button>
          <button>cb/{article.topic}</button>
        </div>
      </div>
    </li>
  );
}
