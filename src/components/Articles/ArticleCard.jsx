import { Link } from "react-router-dom";
import { patchArticleVotes } from "../../../api";
import { useState } from "react";
import { timeSince } from "../../../utils";

export default function ArticleCard({ article, articleVotes }) {
  const [votes, setVotes] = useState(articleVotes);
  const [bodyPreview, setBodyPreview] = useState(true);

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
      return <>{body.slice(0, 100)}...</>;
    }
  };

  return (
    <li className="articles-card">
      <div className="articles-credit-bar">
        <strong>{article.author}</strong>
        <span>&ensp;</span>
        <span>{timeSince(article.created_at)}</span>
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
            {bodyPreview && bodyShortner(article.body)}

            {!bodyPreview && article.body}
          </div>
        </Link>
        {bodyPreview && (
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
              setBodyPreview(false);
            }}
          >
            <p className="view-full-post">View full post</p>
          </Link>
        )}
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
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            cb/{article.topic}
          </button>
        </Link>
      </div>
    </li>
  );
}
