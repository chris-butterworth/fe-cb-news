import { Link, useNavigate } from "react-router-dom";
import { patchArticleVotes } from "../../../api";
import { useState } from "react";
import { timeSince } from "../../../utils";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

export default function ArticleCard({ article, articleVotes, isLoading }) {
  const [votes, setVotes] = useState(articleVotes);
  const [bodyPreview, setBodyPreview] = useState(true);
  const navigate = useNavigate();
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
  console.log(article);
  return (
    <div>
      {isLoading ? (
        <Box sx={{ margin: "auto", padding: "1rem" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <Card>
			<CardActionArea
			  onClick={() => {
				navigate(`/article/${article.article_id}`);
			  }}
			>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe">
                {article.author.slice(0, 1)}
              </Avatar>
            }
            title={article.author}
            subheader={timeSince(article.created_at)}
          />
            <img style={{ maxWidth: "100px" }} src={article.article_img_url} />

            <Typography variant="h5">{article.title}</Typography>

          {bodyPreview && bodyShortner(article.body)}

          {!bodyPreview && article.body}
          </CardActionArea>

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

					  <CardActions>
						  


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


            <Link to={`/article/${article.article_id}`}>
              <Button>💬 {article.comment_count}</Button>
            </Link>

            <Link to={`/topic/${article.topic}`}>
              <Button>cb/{article.topic}</Button>
            </Link>

				  </CardActions>
        </Card>
      )}
    </div>
  );
}
