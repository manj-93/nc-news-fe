import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ArticlesPage from './ArticlePage';
import SingleArticle from './SingleArticle';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
      </Routes>
    </>
  );
};

export default App;