import { useState, useEffect } from 'react';
import { fetchTopics } from '../api';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTopics()
      .then((data) => {
        console.log("Fetched topics:", data);
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load topics');
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <div className="header-left">
          <BackButton />
          <h2>Topics</h2>
        </div>
          </div>
        <ul className="topics-list">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`} className="topic-card">
                <h3 className="topic-title">
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </h3>
                <p className="topic-description">{topic.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default TopicsList;
