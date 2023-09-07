import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useSearchParams } from "react-router-dom";

export default function Articles({ articles, setArticles, topic }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentSort = searchParams.get("sort_by");
    if (!currentSort) setSortBy("created_at");
    const currentOrder = searchParams.get("order");
    if (!currentOrder) setOrder("DESC");
    const topic = searchParams.get("topic");
    const params = { sort_by: sortBy, order: order };
    if (topic) params.topic = topic;
    setSearchParams(params);
  }, [sortBy, order]);

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
      <h3>
        {!topic && "all topics"}
        {topic}
      </h3>
      <label htmlFor="sortby">Sort</label>
      <select
        id="sortby"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option value="created_at">Date posted</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="DESC">descending</option>
        <option value="ASC">ascending</option>
      </select>
      <button
        onClick={() => {
          setSortBy("created_at");
          setOrder("DESC");
        }}
      >
        reset
      </button>
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
