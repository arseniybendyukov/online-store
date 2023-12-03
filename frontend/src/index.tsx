import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { YMaps } from '@pbe/react-yandex-maps';
import { Provider } from 'react-redux';
import { router } from './navigation/router';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './css/index.css';
import './css/reset.css';
import { AuthMiddleware } from './components/AuthMiddleware';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <YMaps>
          <AuthMiddleware>
            <RouterProvider router={router} />
          </AuthMiddleware>
        </YMaps>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
