import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useParams, useSearchParams } from "react-router-dom";
import SortBar from "./SortBar";

export default function Articles({
  articles,
  setArticles,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic, searchParams)
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
          setIsError(msg);
        }
      );
  }, [topic, searchParams]);

  if (isLoading) return <p className="loading-message">Loading... <br/> Data is hosted using a free plan at Render which spins down during inactivity. It won't be a moment! </p>;
  if (isError)
    return (
      <div className="error-message">
        {typeof isError === "string" && <strong>{isError}</strong>}
        {typeof isError !== "string" && (
          <div>
            <strong>{Object.keys(isError)} = </strong>
            <ol>
              {Object.values(isError)[0].map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ol>
          </div>
        )}
      </div>
    );
  return (
    <div>
      <SortBar
        topic={topic}
        sortBy={sortBy}
        order={order}
        setOrder={setOrder}
        setSortBy={setSortBy}
      />
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
