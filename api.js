import axios from "axios";

const myApi = axios.create({ baseURL: "https://cb-news.onrender.com/api" });

export const getArticles = (category) => {
  return myApi.get(`/articles`).then(({ data }) => {
    return data;
  });
};

export const getArticle = (article_id) => {
  return myApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getComments = (article_id) => {
  return myApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const patchArticleVotes = (article_id, vote) => {
  return myApi
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data }) => {
      return data;
    });
};

export const patchCommentVotes = (comment_id, vote) => {
  return myApi
    .patch(`/comments/${comment_id}`, { inc_votes: vote })
    .then(({ data }) => {
      return data;
    });
};
