import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Articles from "./Articles/Articles";
import ArticlePage from "./ArticlePage/ArticleSingle";
import Comments from "./Comments/Comments";
import Article from "./ArticlePage/ArticleSingle";

export default function Contents({ topic }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState("jessjelly");

  return (
    <main>
      <Routes>
        <Route
          path="/articles"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              topic={topic}
            
            />
          }
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage article={article} setArticle={setArticle} />}
        >
          <Route
            path=""
            element={
              <Comments
                comments={comments}
                setComments={setComments}
                user={user}
              />
            }
          />
        </Route>
        <Route path="/user"></Route>
        <Route path="/about"></Route>

        <Route path="*" element={<Navigate to="/articles" />} />
      </Routes>
    </main>
  );
}
