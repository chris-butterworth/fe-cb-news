import { Link } from "react-router-dom";
import { patchArticleVotes } from "../../../api";
import { useEffect, useState } from "react";
export default function ArticleCard({ article, articleVotes }) {
  const [votes, setVotes] = useState(articleVotes);

  const handleVote = (event, vote) => {
    event.preventDefault();
    patchArticleVotes(article.article_id, vote).catch(() => {
      alert("your comment could not be added");
    });
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
  };

  const bodyShortner = (body) => {
    if (body.length < 100) {
      return body;
    } else {
      return (
        <>
          {body.slice(0, 100)}...
          <br />
          <a
            href=""
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
        <Link to={`/articles/${article.article_id}`}>
          <img src={article.article_img_url} />
        </Link>
      </div>
      <div className="articles-content">
        <Link to={`/articles/${article.article_id}`}>
          <div className="articles-heading">
            <h3>{article.title}</h3>
          </div>

          <div className="articles-body">
            <p>{bodyShortner(article.body)}</p>
          </div>
        </Link>
      </div>

      <div className="articles-action-bar">
        <div className="articles-action-bar-votes">
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
        <button>💬 {article.comment_count}</button>
        <button>cb/{article.topic}</button>
      </div>
    </li>
  );
}
