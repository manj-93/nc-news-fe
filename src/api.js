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
        console.error("Error fetching items:", error);
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


export { getArticles, getArticleById };