import { Link } from "react-router-dom";
import { patchArticleVotes } from "../../../api";
import { useState } from "react";
import { Button } from "../Button";

export default function ArticleCard({ article, articleVotes }) {
  const [votes, setVotes] = useState(articleVotes);

  const handleVote = (event, vote) => {
    event.preventDefault();
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
    patchArticleVotes(article.article_id, vote).catch(() => {
      alert("your vote could not be added at this time");
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
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <button>View full post</button>
          </Link>
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
        </Link>

        <div className="articles-body">
          <p>{bodyShortner(article.body)}</p>
        </div>
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

        <Link to={`/articles/${article.article_id}`}>
          <button>💬 {article.comment_count}</button>
        </Link>

        <Link to={``}>
          <button>cb/{article.topic}</button>
        </Link>
      </div>
    </li>
  );
}
