import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Provider } from "react-redux";
import store from "./store/store";
import { fetchWords } from './store/words/wordsSlice';

// This fetches the file public/data/words.json and stores its data in the Redux store
// The data is fetched only one time, when the application runs
store.dispatch(fetchWords());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);