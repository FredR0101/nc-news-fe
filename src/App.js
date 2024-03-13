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

export const PatchVotesByArticleId = (article_id, voteChange) => {
  const patchBody = {
    inc_votes: voteChange
  }
  return ncNewsApi.patch(`/articles/${article_id}`, patchBody).then(({data}) => {
    return data.article
  })
}


export const getUsers = () => {
  return ncNewsApi.get("/users").then((response) => {
    return response.data.users
  })
}

export const postComment = (article_id, user, comment) => {
  const postData = {
    author: user.username,
    body: comment
  }
  return ncNewsApi.post(`/articles/${article_id}/comments`, postData).then(({data}) => {
    return data.comments
  })
}