import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-lhwd.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles").then((response) => {
    return response.data.articles;
  });
};

export const fetchArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    })
}

export const fetchCommentsById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.article
  })
}

export const incPatchVotesByArticleId = (article_id) => {
  const patchBody = {
    inc_votes: 1
  }
  return ncNewsApi.patch(`/articles/${article_id}`, patchBody).then(({data}) => {
    return data.article
  })
}

export const decPatchVotesByArticleId = (article_id) => {
  const patchBody = {
    inc_votes: -1
  }
  return ncNewsApi.patch(`/articles/${article_id}`, patchBody).then(({data}) => {
    return data.article
  })
}