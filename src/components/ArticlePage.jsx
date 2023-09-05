import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Article({article, setArticle}) {
    const {article_id} = useParams()
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
    console.log(article_id)
  return (
    <div className="articles-card">
      <div className="articles-credit-bar">
        <strong>{article.author}</strong>
        <span>{article.created_at}</span>
      </div>

      <div className="articles-img-thumbnail">
        <img src={article.article_img_url} />
      </div>

      <div className="articles-content">
        <div className="articles-heading">
          <h3>{article.title}</h3>
        </div>
        <div className="articles-body">
          <p>{article.body}</p>
        </div>
        <div className="articles-action-bar">
          <div className="articles-action-bar-votes">
            <button>-</button>
            <strong>{article.votes}</strong>
            <button>+</button>
          </div>
          <button>💬 {article.comment_count}</button>
          <button>cb/{article.topic}</button>
        </div>
      </div>
    </div>
  );
}
