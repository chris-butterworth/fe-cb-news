import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useSearchParams } from "react-router-dom";

export default function Articles({ articles, setArticles}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(searchParams)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [searchParams]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An unexpected error has occurred</p>;

  return (
    <div>
      <h2>sort by will be here</h2>
      <ul>
        {articles.map((article) => {
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
