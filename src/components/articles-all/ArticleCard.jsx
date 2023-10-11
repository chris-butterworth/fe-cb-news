import { useNavigate } from "react-router-dom";
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
  CardContent,
  CardHeader,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";

export default function ArticleCard({ article, articleVotes, isLoading }) {
  const [votes, setVotes] = useState(articleVotes);
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

  return (
    <div>
      {isLoading ? (
        <Box sx={{ margin: "auto", padding: "1rem" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <Card
          sx={{
            boxShadow: 3,
            m: { xs: 1, md: 2 },
          }}
        >
          <CardActionArea
            onClick={() => {
              navigate(`/article/${article.article_id}`);
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe">
                  {article.author.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              title={article.author}
              subheader={timeSince(article.created_at)}
            />
            <CardContent
              sx={{
                p: 1,
                pt: 0,
                pb: 0,
                display: "flex",
                flexDirection: { xs: "column-reverse", sm: "inherit" },
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Typography variant="h5">{article.title}</Typography>
                <Typography
                  sx={{
                    display: { xs: "none", sm: "block" },
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  {article.body}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: { sm: 200 },
                  objectFit: "contain",
                  mt: { sm: 2 },
                  mb: "auto",
                  ml: { sm: 3 },
                  borderRadius: 1,
                }}
                image={article.article_img_url}
              />
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
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
                onClick={() => navigate(`/article/${article.article_id}`)}
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
      )}
    </div>
  );
}
