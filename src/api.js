import axios from 'axios';

const api = axios.create({
  baseURL: 'https://be-nc-news-fhnz.onrender.com/api'
});

const getArticles = () => {
  return api.get('/articles')
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

const getArticleById = (id) => {
  return api.get(`/articles/${id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

const getCommentsByArticleId = (id) => {
  return api.get(`/articles/${id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};

const updateArticleVotes = (article_id, voteChange) => {
  return api.patch(`/articles/${article_id}`, {
    inc_votes: voteChange
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating votes:', error);
      throw error;
    });
};

export { getArticles, getArticleById, getCommentsByArticleId, updateArticleVotes };