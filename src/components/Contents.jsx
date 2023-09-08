import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Articles from "./Articles/Articles";
import ArticlePage from "./ArticlePage/ArticleSingle";
import Comments from "./Comments/Comments";

export default function Contents({ topic }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [user, setUser] = useState("jessjelly");

  return (
    <main>
      <Routes>
        <Route
          path="/:topic"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
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

        <Route path="*" element={<Navigate to="/all" />} />
      </Routes>
    </main>
  );
}
