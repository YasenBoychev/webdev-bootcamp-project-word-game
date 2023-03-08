import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchFunction from './fetchFunction';

// This slice holds the words used in the game. Ideally the server would send a
// single word at a time in order to reduce the memory load but a requirement
// for this application was that the whole state is held on the client side.

// The words are fetched using the fetch API from the public/data/words.json file
// The data is fetched only one time, when the application runs, by calling 
// store.dispatch(fetchWords()) in index.js

const initialState = {
  entities: {},
  status: null,
  error: null
};

let fetchWordsCallback = fetchFunction("data/words.json");
export const fetchWords = createAsyncThunk('words/fetchWords', fetchWordsCallback);

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchWords.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default wordsSlice.reducer;