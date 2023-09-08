import axios from "axios";

const myApi = axios.create({ baseURL: "https://cb-news.onrender.com/api" });

export const getTopics = () => {
  return myApi.get("/topics").then(({ data }) => {
    return data;
  });
};

export const getArticles = (topic, searchParams) => {
  if (!topic) topic = "all";
  let topicQuery = "";
  if (topic !== "all") {
    topicQuery = `topic=${topic}&`;
  }
  // console.log(topic, searchParams)
  return myApi
    .get(`/articles?${topicQuery}${searchParams}`)
    .then(({ data }) => {
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

export const deleteComment = (comment_id) => {
  return myApi.delete(`/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
};

export const postComment = (article_id, user, body) => {
  return myApi
    .post(`/articles/${article_id}/comments`, {
      username: user,
      body: body,
    })
    .then(({ data }) => {
      return data;
    });
};
