import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-lhwd.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};
