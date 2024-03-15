import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-lhwd.onrender.com/api",
});

export const getArticles = (searchTerm1, searchTerm2, searchTerm3) => {
  const params = {};
  if (searchTerm1) params.topic = searchTerm1;
  if (searchTerm2) params.sort_by = searchTerm2;
  if (searchTerm3) params.order = searchTerm3;

  return ncNewsApi.get("/articles", { params }).then((response) => {
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

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`)
}
