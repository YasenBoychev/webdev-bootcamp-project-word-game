import { createSlice } from '@reduxjs/toolkit';

// state.wordLetters holds the currently played word
// Its format is:
// Keys in wordLetters are letter positions in the word
// Values are objects with keys/values -
// {letter: char, position: int, revealed: bool}

// When the state of gameNumber changes (e.g. by clicking the NEW GAME button),
// the action setupNewGame is called in App.js to start a new game

// The state.alphabet object holds the current state of the UI alphabet keypad

const initialState = {
  gameNumber: 1,
  wordLetters: {},
  initialLives: 7,
  lives: 7,
  gameLost: false,
  gameWon: false,
  alphabet: {
    1: { character: "A", guess: null },
    2: { character: "B", guess: null },
    3: { character: "C", guess: null },
    4: { character: "D", guess: null },
    5: { character: "E", guess: null },
    6: { character: "F", guess: null },
    7: { character: "G", guess: null },
    8: { character: "H", guess: null },
    9: { character: "I", guess: null },
    10: { character: "J", guess: null },
    11: { character: "K", guess: null },
    12: { character: "L", guess: null },
    13: { character: "M", guess: null },
    14: { character: "N", guess: null },
    15: { character: "O", guess: null },
    16: { character: "P", guess: null },
    17: { character: "Q", guess: null },
    18: { character: "R", guess: null },
    19: { character: "S", guess: null },
    20: { character: "T", guess: null },
    21: { character: "U", guess: null },
    22: { character: "V", guess: null },
    23: { character: "W", guess: null },
    24: { character: "X", guess: null },
    25: { character: "Y", guess: null },
    26: { character: "Z", guess: null },
    27: { character: "-", guess: null }
  }
};

const gameplaySlice = createSlice({
  name: 'gameplay',
  initialState,
  reducers: {
    startNewGame: (state, action) => {
      // When the state of gameNumber changes, the action setupNewGame is called in App.js to start a new game
      state.gameNumber = state.gameNumber + 1;
    },
    setupNewGame: (state, action) => {
      const newWord = action.payload;

      // Reset
      state.wordLetters = { ...initialState.wordLetters };
      state.lives = initialState.lives;
      state.gameLost = initialState.gameLost;
      state.gameWon = initialState.gameWon;
      state.alphabet = { ...initialState.alphabet };

      // Add the new word
      // ----------------
      // The object keys are the letter positions
      for (let i = 0; i < newWord.length; i++) {
        state.wordLetters[i + 1] = {
          letter: newWord[i].toUpperCase(),
          position: (i + 1),
          revealed: false
        }
      }
    },
    makeGuess: (state, action) => {
      const letter = action.payload.toUpperCase();
      const letterPositions = Object.keys(state.wordLetters);

      // Check if the guess is correct
      // And if the game was won (all letters revealed)
      let correctGuess = false;
      let gameWon = true; // set to false if a letter is not revealed
      letterPositions.forEach(key => {
        // Check if guess is correct
        if (state.wordLetters[key].letter === letter) {
          correctGuess = true;
          state.wordLetters[key].revealed = true;
        }

        // Set gameWon to false if a letter is not revealed
        if (state.wordLetters[key].revealed === false) {
          gameWon = false;
        }
      });

      // Update the state of the alphabet list
      for (let id of Object.keys(state.alphabet)) {
        if (state.alphabet[id].character === letter) {
          if (correctGuess) {
            state.alphabet[id].guess = true;
          } else {
            state.alphabet[id].guess = false;
          }
        }
      }

      // If the guess is incorrect remove a live
      if (!correctGuess) {
        state.lives = state.lives - 1;
      }

      // Check if the game is over
      if (state.lives === 0) {
        state.gameLost = true;
      }

      // If game was won change state.gameWon to true
      if (gameWon) {
        state.gameWon = true;
      }
    },
    endGame: (state, action) => {
      if (state.gameLost) {
        const letterPositions = Object.keys(state.wordLetters);
        for (let position of letterPositions) {
          state.wordLetters[position].revealed = true;
        }
      }
    }
  }
});

export const { startNewGame, setupNewGame, makeGuess, endGame } = gameplaySlice.actions;
export default gameplaySlice.reducer;