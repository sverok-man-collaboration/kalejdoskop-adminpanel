import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaRobot } from "react-icons/Fa";
import { IoChatboxSharp } from "react-icons/io5";

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

      <div className="flex justify-center items-center">
        <div className="w-4/12 flex m-20 flex-col">
<div className="flex flex-col items-end">
          <div className="block min-h-min-40 w-4/5 py-10 bg-secondary">
            <h5 className="text-center text-primary">Oops!</h5>
            <p className="pl-5 text-primary">Sorry, an error has occurred</p>
            <i className="pl-5 mt-1 text-primary">
              {error.statusText || error.message}
            </i>
          </div>
          </div>
          <div className="flex justify-center">
          <div
            className="block w-[30px] h-[30px] ml-[10px] bg-secondary"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)" }}
          ></div>
          </div>

          <div className="flex justify-start mb-20 mt-10">
            <FaRobot className="text-primary text-[140px]" />
          </div>
          <Link to="/">
            <p className="text-primary text-[20px] text-center ">
              Gå till Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ErrorPage;
