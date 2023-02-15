import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//React-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages imports
import Login from "./pages/Login/Login";
import Overview from "./pages/Overview/Overview";
import Posts from "./pages/Posts/Posts";
import ErrorPage from './pages/ErrorPage/ErrorPage';

//React-helmet-async
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  /**
   * RouteObject as object.
   * @type {object}
   */
  ([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "overview",
      element: <Overview />,
      errorElement: <ErrorPage />,
    },
    {
      path: "posts",
      element: <Posts />,
      errorElement: <ErrorPage />,
    },
  ])
);

const routerProviderProps = {
  children: <App />,
  router: router,
};

/**
 * The root element of the React application, obtained by `document.getElementById("root")`.
 * It should be a valid HTML element.
 * @param {HTMLElement} rootElement
 */
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HelmetProvider>
      <RouterProvider {...routerProviderProps}>
        <App />
      </RouterProvider>
    </HelmetProvider>
  );
} else {
  throw new Error("Root element with id 'root' not found in the DOM");
}
