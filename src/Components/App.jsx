import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import ArticlesPage from './ArticlePage';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </>
  );
};

export default App;