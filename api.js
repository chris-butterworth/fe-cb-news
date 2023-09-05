import axios from "axios";

const myApi = axios.create({ baseURL: "https://cb-news.onrender.com/api" });

export const getArticles = (category) => {
  return myApi.get(`/articles`).then(({ data }) => {
    return data;
  });
};
