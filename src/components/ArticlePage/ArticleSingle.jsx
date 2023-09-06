import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticle, patchArticleVotes } from "../../../api";

export default function Article({ article, setArticle }) {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(article_id)
      .then((data) => {
        setArticle(data);
        setVotes(data.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  const handleVote = (event, vote) => {
    event.preventDefault();
    setVotes((currVotes) => {
      currVotes += vote;
      return currVotes;
    });
    patchArticleVotes(article.article_id, vote).catch(() => {
      alert("your vote could not be added at this time");
    });
  };

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
            <button
              onClick={(event) => {
                handleVote(event, -1);
              }}
            >
              -
            </button>
            <strong>{votes}</strong>
            <button
              onClick={(event) => {
                handleVote(event, 1);
              }}
            >
              +
            </button>
          </div>
          <p> {article.comment_count} comments</p>
          <button>cb/{article.topic}</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
