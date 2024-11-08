import BackButton from './BackButton';

export default function Error({ status, message }) {
    return (
      <main>
        <div className="container">
          <div className="error-container">
            <div className="header-left">
              <BackButton />
              <h2>Error {status} - {message}</h2>
            </div>
          </div>
        </div>
      </main>
    );
  }