import axios from "axios";

export const getArticles = (category) => {
  return axios
    .get(
      `https://cb-news.onrender.com/api/articles`
    )
    .then(({data}) => {
      return data;
    });
};