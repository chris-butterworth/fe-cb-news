import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle, patchArticleVotes } from "../../../api";
import { timeSince } from "../../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
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

  if (isLoading)
    return (
      <Box sx={{ margin: "auto", padding: "1rem" }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />

        <Skeleton
          sx={{ height: 300, mt: 3, mb: 3 }}
          animation="wave"
          variant="rectangular"
        />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  if (isError) return <h3>{isError}</h3>;

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon />
      </Button>

      <CardContent
        sx={{ display: "flex", justifyContent: "space-between", pb: 0, pt: 0 }}
      >
        <Typography gutterBottom>{article.author}</Typography>
        <Typography color="text.secondary" gutterBottom>
          {timeSince(article.created_at)}
        </Typography>
      </CardContent>

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
        <Typography sx={{ m: 1 }} variant="h5">
          {article.title}
        </Typography>
        <CardMedia
          component="img"
          image={article.article_img_url}
          sx={{
            objectFit: "contain",
            borderRadius: 1,
          }}
        />

        <Typography sx={{ m: 1 }}>{article.body}</Typography>
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
      {/* </Card> */}
      <Outlet />
    </div>
  );
}
