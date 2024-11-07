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

const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

const postComment = (article_id, commentText) => {
  return api.post(`/articles/${article_id}/comments`, {
    username: 'jessjelly', 
    body: commentText
  })
    .then((response) => {
      if (!response.data.comment) {
        throw new Error('No comment data received');
      }
      return response.data.comment;
    })
    .catch((error) => {
      console.error('API Error:', error);
      throw error;
    });
};

const getCommentsByArticleId = (article_id) => {
  return api.get(`/articles/${article_id}/comments`)
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

export { getArticles, getArticleById, postComment, getCommentsByArticleId, updateArticleVotes };