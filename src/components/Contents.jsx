import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Articles from "./articles-all/AllArticles";
import ArticlePage from "./articles-single/ArticleSingle";
import Comments from "./comments/Comments";
import UserProfile from "./User/UserProfile";
import Login from "./user/Login";
import CreditPage from "./articles-single/CreditPage";

import { Box } from "@mui/material";

export default function Contents({ setTopic }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  // the searchParam states must live here because the Articles page gets reloaded when selecting a new topic, which resets all the queries
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  return (
    <Box>
      <Routes>
        <Route path="/credit" element={<CreditPage />} />

        <Route
          path="/topic/:topic"
          element={
            <Articles
              articles={articles}
              setArticles={setArticles}
              sortBy={sortBy}
              order={order}
              setOrder={setOrder}
              setSortBy={setSortBy}
              setTopic={setTopic}
            />
          }
        />
        <Route
          path="/article/:article_id"
          element={<ArticlePage article={article} setArticle={setArticle} />}
        >
          <Route
            path=""
            element={<Comments comments={comments} setComments={setComments} />}
          />
        </Route>
        <Route
          path="/profile"
          element={
            <UserProfile articles={articles} setArticles={setArticles} />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/topic/all" />} />
      </Routes>
    </Box>
  );
}
