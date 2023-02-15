import React from "react";
import { useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function ErrorPage() {
  /**
   * Error as object.
   * @type {object}
   */
  const error = useRouteError();
  return (
    <div id="error-page">
      <Helmet>
        <title>Sidan hittades inte!</title>
      </Helmet>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <pre>
        <i>{error.statusText || error.message}</i>
      </pre>
    </div>
  );
}
export default ErrorPage;
