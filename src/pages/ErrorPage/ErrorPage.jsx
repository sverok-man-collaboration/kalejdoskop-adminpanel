import React from "react";
import { useRouteError, Link } from "react-router-dom";
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

      <div className="w-4/5 sm:w-3/5 my-6 mx-auto">
        <div id="speech-bubble" className="w-4/5 ml-auto">
          <div className="block w-full md:w-4/5 py-10 bg-secondary text-primary">
            <h5 className="px-5 mb-4 text-xl">Oops!</h5>
            <p className="px-5 mb-1">Något gick fel</p>
            <i className="px-5 inline-block">
              {error.status} {error.statusText || error.message}
            </i>
          </div>
          <div
            className="block w-[30px] h-[30px] ml-[15%] bg-secondary"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)" }}
          ></div>
        </div>

        <img
          src="/robot_icon.png"
          alt="robot"
          className="w-[90px] sm:w-[150px] ml-2 sm:ml-2 md:ml-[10%] mt-1"
        />

        <Link to="/" className="mx-auto mt-20 block">
          <button className="mx-auto block min-w-[200px] transform bg-accent transition duration-500 rounded-md text-white p-2 hover:bg-accentHover">
            Gå till Login
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ErrorPage;
