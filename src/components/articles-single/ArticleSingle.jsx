import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle, patchArticleVotes } from "../../../api";
import { timeSince } from "../../../utils";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";

export default function Article({ article, setArticle }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [votes, setVotes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(article_id)
      .then((data) => {
        setArticle(data);
        setVotes(data.votes);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          setIsLoading(false);
          setIsError(msg);
        }
      );
  }, []);

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
      alert("your vote could not be added at this time");
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>{isError}</h3>;

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>

      <Card sx={{ m: 1 }}>
        <CardHeader
          className="article-single-credit-bar"
          title={article.author}
          subheader={timeSince(article.created_at)}
        />

        <CardContent
          sx={{
            p: 1,
            pt: 0,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            image={article.article_img_url}
            sx={{
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
          <Typography variant="h5">{article.title}</Typography>

          <Typography>{article.body}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button
              onClick={(event) => {
                handleVote(event, -1);
              }}
            >
              <ThumbDown />
            </Button>
            <strong>{votes}</strong>
            <Button
              onClick={(event) => {
                handleVote(event, 1);
              }}
            >
              <ThumbUp />
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() =>
                document.querySelector("#comments").scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
            >
              <CommentIcon sx={{ mr: 2 }} />{" "}
              <Typography> {article.comment_count}</Typography>
            </Button>
          </Box>
          <Box>
            <Button onClick={() => navigate(`/topic/${article.topic}`)}>
              {article.topic}
            </Button>
          </Box>
        </CardActions>
      </Card>
      <Outlet />
    </div>
  );
}
