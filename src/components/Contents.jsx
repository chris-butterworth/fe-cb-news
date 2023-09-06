import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Articles from "./Articles/Articles";
import ArticlePage from "./ArticlePage/ArticleSingle";
import Comments from "./Comments/Comments";

export default function Contents() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState("jessjelly");

  return (
    <main>
      <Routes>
        <Route
          path="/articles"
          element={<Articles articles={articles} setArticles={setArticles} />}
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

        <Route path="*" element={<Navigate to="/articles" />} />
      </Routes>
    </main>
  );
}
