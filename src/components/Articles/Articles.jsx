import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useParams, useSearchParams } from "react-router-dom";

export default function Articles({
  articles,
  setArticles,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewAllUserPosts, setViewAllUserPosts] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic, username } = useParams();

  useEffect(() => {
    setSearchParams((searchParams) => {
      sortBy == "created_at"
        ? searchParams.delete("sort_by")
        : searchParams.set("sort_by", sortBy);
      order == "DESC"
        ? searchParams.delete("order")
        : searchParams.set("order", order);
      return searchParams;
    });
    localStorage.setItem("searchParams", searchParams);
  }, [sortBy, order, topic]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles(topic, localStorage.searchParams)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic, searchParams]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An unexpected error has occurred</p>;

  return (
    <div>
      {!username && (
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
        </div>
      )}
      <ul>
        {username && (
          <div>
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
          </div>
        )}
        {!username &&
          articles.map((article) => {
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
