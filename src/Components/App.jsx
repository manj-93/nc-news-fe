import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ArticlesPage from './ArticlesPage';
import SingleArticle from './SingleArticle';
import TopicPage from './TopicsPage';
import TopicsList from './TopicsList'; 
import Error from './ErrorHandling';
import HomePage from './HomePage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Error status={404} message="Page not found" />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
      </Routes>
    </>
  );
};

export default App;
