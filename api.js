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

export const updateVotes = (path, body) => {
  return myApi.patch(path, body).then(({ data }) => {
    return data;
  });
};

export const voteHandler = (type, idValue) => {
  let path = `${type}/${idValue}`;
  return function (vote) {
    updateVotes(path, { inc_votes: vote }).catch(() => {
      alert("your vote could not be added this time");
    });
  };
};
