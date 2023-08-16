import { useLocation } from 'react-router-dom';

interface ErrorObject {
  statusText?: string;
  message: string;
}

const ErrorPage = () => {
  const location = useLocation();
  const error: ErrorObject = location.state?.error || { message: 'Unknown error' };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
