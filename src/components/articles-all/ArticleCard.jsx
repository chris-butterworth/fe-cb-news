import { Link } from "react-router-dom";
import { patchArticleVotes } from "../../../api";
import { useState } from "react";
import { timeSince } from "../../../utils";
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";

export default function ArticleCard({ article, articleVotes, isLoading }) {
  const [votes, setVotes] = useState(articleVotes);
  const [bodyPreview, setBodyPreview] = useState(true);

  const handleVote = (event, vote) => {
    event.preventDefault();
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
    patchArticleVotes(article.article_id, vote).catch(() => {
      setVotes((currVotes) => {
        currVotes -= vote;
        return currVotes;
      });
      alert("Your vote could not be added at this time");
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
    <Box sx={{}}>
      {isLoading ? (
        <Box sx={{ margin: "auto", padding: "1rem" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <li className="articles-card">
          <div className="articles-credit-bar">
            <strong>{article.author}</strong>
            <span>&ensp;</span>
            <span>{timeSince(article.created_at)}</span>
          </div>

          <div className="articles-img-thumbnail">
            <Link to={`/article/${article.article_id}`}>
              <img
                style={{ maxWidth: "100px" }}
                src={article.article_img_url}
              />
            </Link>
          </div>
          <div className="articles-content">
            <Link to={`/article/${article.article_id}`}>
              <div className="articles-heading">
                <Typography variant="h5">{article.title}</Typography>
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
              <Button
                onClick={(event) => {
                  handleVote(event, -1);
                }}
              >
                -
              </Button>
              <strong>{votes}</strong>
              <Button
                onClick={(event) => {
                  handleVote(event, 1);
                }}
              >
                +
              </Button>
            </div>

            <Link to={`/article/${article.article_id}`}>
              <Button>💬 {article.comment_count}</Button>
            </Link>

            <Link to={`/topic/${article.topic}`}>
              <Button>cb/{article.topic}</Button>
            </Link>
          </div>
        </li>
      )}
    </Box>
  );
}
