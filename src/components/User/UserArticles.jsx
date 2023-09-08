import ArticleCard from "../Articles/ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useParams } from "react-router-dom";

export default function UserArticles({ articles, setArticles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [viewAllUserPosts, setViewAllUserPosts] = useState(false);
  const { username } = useParams();

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <strong>{isError}</strong>;
  return (
    <div>
      <ul>
        <h3>Your most recent posts</h3>
        <button
          onClick={() => {
            viewAllUserPosts
              ? setViewAllUserPosts(false)
              : setViewAllUserPosts(true);
          }}
        >
          {viewAllUserPosts ? "View less" : "View all"}
        </button>
        {articles
          .filter((article) => article.author === username)
          .slice(0, viewAllUserPosts ? articles.length : 3)
          .map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                articleVotes={article.votes}
              />
            );
          })}
      </ul>
    </div>
  );
}
