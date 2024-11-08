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
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      throw error;
    });
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`)
    .then((response) => response.data.article)
    .catch((error) => {
      throw error;
    });
};

export const postComment = (article_id, commentText) => {
  return api.post(`/articles/${article_id}/comments`, {
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
      throw error;
    });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return api.get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
};

export const updateArticleVotes = (article_id, voteChange) => {
  return api.patch(`/articles/${article_id}`, {
    inc_votes: voteChange,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTopics = () => {
  return api.get('/topics') 
    .then((response) => {
      console.log('Fetched topics:', response.data.topics);
      return response.data.topics;
    })
    .catch((error) => {
      console.error('Error fetching topics:', error);
      throw error;
    });
};

export const fetchArticlesByTopic = (slug) => {
  return api.get(`/articles?topic=${slug}`)
    .then((response) => response.data.articles)
    .catch((error) => {
      console.error('Error fetching articles for topic:', error);
      throw error;
    });
};