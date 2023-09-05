import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle } from "../../../api";

export default function Article({ article, setArticle }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(article_id)
      .then((data) => {
        setArticle(data);
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
      <p>Back button will be here</p>
      <div className="article-single-card">
        <div className="article-single-credit-bar">
          <strong>{article.author}</strong>
          <span>{article.created_at}</span>
        </div>

        <div className="article-single-heading">
          <h3>{article.title}</h3>
        </div>
        <div className="article-single-img-thumbnail">
          <img src={article.article_img_url} />
        </div>
        <div className="article-single-body">
          <p>{article.body}</p>
        </div>
        <div className="article-single-action-bar">
          <div className="article-single-action-bar-votes">
            <button>-</button>
            <strong>{article.votes}</strong>
            <button>+</button>
          </div>
          <button>💬 {article.comment_count}</button>
          <button>cb/{article.topic}</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
