// This file sets up the Redux store

import { configureStore } from '@reduxjs/toolkit';

import wordsReducer from './words/wordsSlice';
import gameplayReducer from './gameplay/gameplaySlice';

const store = configureStore({
  reducer: {
    words: wordsReducer,
    gameplay: gameplayReducer
  }
});

export default store;