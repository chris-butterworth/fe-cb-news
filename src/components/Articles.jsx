import ArticleCard from "./ArticleCard";

export default function Articles({ articles, setArticles }) {
  return (
    <div>
      <h2>Articles</h2>
      {articles.map((article) => {
        return <ArticleCard article={article}/>
      })}
    </div>
  );
}
