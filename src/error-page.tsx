import { useRouteError, RouteError } from 'react-router-dom';

interface ErrorObject extends RouteError {
  statusText?: string;
  error: string | null;
  message: string;
}

const ErrorPage = () => {
  const error: ErrorObject = useRouteError();
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
