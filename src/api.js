import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://be-nc-news-fhnz.onrender.com/api',
});

export const getArticles = ({ sort_by = 'created_at', order = 'desc' } = {}) => {
  return api
    .get('/articles', {
      params: {
        sort_by,
        order
      }
    })
    .then((response) => response.data.articles)
    .catch((error) => {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message || 'Failed to load articles'
      };
    });
};

export const getArticleById = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message || "Article not found"
      };
    });
};

export const postComment = (article_id, commentText) => {
  return api
    .post(`/articles/${article_id}/comments`, {
      username: 'jessjelly',
      body: commentText,
    })
    .then((response) => {
      if (!response.data.comment) {
        throw new Error('No comment data received');
      }
      return response.data.comment;
    })
    .catch((error) => {
      throw error.response?.data || error;
    });
};

export const deleteComment = (commentId) => {
  return api
    .delete(`/comments/${commentId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => response.data.comments)
    .catch((error) => {
      throw error.response?.data || error;
    });
};

export const updateArticleVotes = (article_id, voteChange) => {
  return api
    .patch(`/articles/${article_id}`, {
      inc_votes: voteChange,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error;
    });
};

export const fetchTopics = () => {
  return api
    .get('/topics')
    .then((response) => response.data.topics)
    .catch((error) => {
      console.error('Error fetching topics:', error);
      throw error.response?.data || error;
    });
};

export const fetchArticlesByTopic = (slug) => {
  return api
    .get('/articles', {
      params: { topic: slug }
    })
    .then((response) => response.data.articles)
    .catch((error) => {
      throw {
        status: error.response.status,
        message: error.response.data.message
      };
    });
};

