import ArticleCard from "../articles-all/ArticleCard";
import { useEffect, useState, useContext } from "react";
import { getArticles } from "../../../api";
import { Context } from "../contexts/Contexts";
import { Box, Button, Skeleton, Typography } from "@mui/material";
export default function UserArticles({ articles, setArticles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [viewAllUserPosts, setViewAllUserPosts] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          setIsLoading(false);
          setIsError(JSON.stringify(msg));
        }
      );
  }, []);

  if (isLoading)
    return (
      <Box sx={{ margin: "auto", padding: "1rem" }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  if (isError) return <Typography>{isError}</Typography>;
  return (
    
    <div>
      
      <Typography variant="h6" sx={{ m: 2 }}>
        Your most recent posts
      </Typography>
      {articles
        .filter((article) => article.author === user.username)
        .slice(0, viewAllUserPosts ? articles.length : 1)
        .map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
              articleVotes={article.votes}
            />
          );
        })}
      <Button
        sx={{ width: "100%", mb:1 }}
        onClick={() => {
          viewAllUserPosts
            ? setViewAllUserPosts(false)
            : setViewAllUserPosts(true);
        }}
      >
        {viewAllUserPosts ? "View less" : "View all"}
      </Button>
    </div>
  );
}
