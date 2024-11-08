import { useRouteError } from 'react-router-dom';
import BackButton from './BackButton';

const ErrorPage = ({ message, status }) => {
    return (
      <main>
        <div className="container">
          <div className="error-container">
            <div className="header-left">
              <BackButton />
              <h2>Error {status}</h2>
            </div>
            <div className="error-content">
              <p className="error-message">{message}</p>
              <p className="error-details">
                {status === 404 
                  ? "Check the URL and try again"
                  : "Please try again later"}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  };

export default ErrorPage;