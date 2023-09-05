import ArticleCard from "./ArticleCard";

export default function Articles({ articles, setArticles }) {
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
