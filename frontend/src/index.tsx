import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { router } from './navigation/router';
import { store } from './redux/store';
import './css/index.css';
import './css/reset.css';
import { AuthMiddleware } from './components/AuthMiddleware';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </Provider>
  </React.StrictMode>
);
