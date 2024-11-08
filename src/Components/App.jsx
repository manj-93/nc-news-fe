import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ArticlesPage from './ArticlePage';
import SingleArticle from './SingleArticle';
import TopicPage from './TopicsPage';
import TopicsList from './TopicsList'; 
import ErrorPage from './ErrorPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
        <Route path="*" element={<ErrorPage message="Page not found" status={404} />} />
      </Routes>
    </>
  );
};

export default App;
