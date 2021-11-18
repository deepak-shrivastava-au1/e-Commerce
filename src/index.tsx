import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRoutes from './routers';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from './redux/configureStore';
import { initMessageListener} from "redux-state-sync";
import './i18next';

const { store, persistor } = configStore();

initMessageListener(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getRoutes(store)}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
