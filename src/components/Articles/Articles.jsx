import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";

export default function Articles({ articles, setArticles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An unexpected error has occurred</p>;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </div>
  );
}
