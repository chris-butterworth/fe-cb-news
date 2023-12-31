import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../../../api";
import { useParams, useSearchParams } from "react-router-dom";
import SortBar from "./SortBar";
import CreditsCard from "./CreditsCard";
import { Alert, AlertTitle, Typography } from "@mui/material";

export default function Articles({
  articles,
  setArticles,
  sortBy,
  setSortBy,
  order,
  setOrder,
  setTopic,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("sort_by")) setSortBy(searchParams.get("sort_by"));
    if (searchParams.get("order")) setOrder(searchParams.get("order"));
    setSearchParams((searchParams) => {
      order === "DESC" || order === ""
        ? searchParams.delete("order")
        : searchParams.set("order", order);
      sortBy === "created_at" || sortBy === ""
        ? searchParams.delete("sort_by")
        : searchParams.set("sort_by", sortBy);
      return searchParams;
    });
    setTopic(topic);
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
  }, [topic, order, sortBy]);

  if (isError)
    return (
      <Alert severity="error" sx={{ m: 2, p: 2, boxShadow: 5 }}>
        {typeof isError === "string" && <AlertTitle>{isError}</AlertTitle>}
        {typeof isError !== "string" && (
          <div>
            <AlertTitle variant="h4">Error</AlertTitle>
            <Typography variant="h5">{Object.keys(isError)} = </Typography>
            {Object.values(isError)[0].map((item) => {
              return <Typography key={item}>{item}</Typography>;
            })}
          </div>
        )}
      </Alert>
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
      <CreditsCard />
      {articles.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
            articleVotes={article.votes}
            isLoading={isLoading}
          />
        );
      })}
    </div>
  );
}
