import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavPaths } from './navigation';
import './css/index.css';
import './css/reset.css';
import { App } from './App';

const router = createBrowserRouter([
  {
    path: NavPaths.MAIN,
    element: <App />,
    children: [
      {
        path: NavPaths.ABOUT,
        element: 'about page',
      },
      {
        path: NavPaths.BLOG,
        element: 'blog page',
      },
      {
        path: NavPaths.CATALOG,
        element: 'catalog page',
      },
      {
        path: NavPaths.CONTACTS,
        element: 'contacts page',
      },
      {
        path: NavPaths.HOW_TO_BUY,
        element: 'how to buy page',
      },
      {
        path: NavPaths.LOGIN,
        element: 'login page',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
