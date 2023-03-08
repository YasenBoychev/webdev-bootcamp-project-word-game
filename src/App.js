import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import custom components
import Keypad from './components/Keypad/Keypad';
import CurrentWord from './components/CurrentWord/CurrentWord';
import EndGame from './components/EndGame/EndGame';
import Lives from './components/Lives/Lives';
import InfoModal from './components/InfoModal/InfoModal';

// Import relevant Action creators from gameplaySlice
import { startNewGame, setupNewGame } from './store/gameplay/gameplaySlice';

function App() {

  const dispatch = useDispatch();

  // Get the available words
  const wordsStatus = useSelector(state => state.words.status);
  const words = useSelector(state => state.words.entities);
  const wordIds = Object.keys(words);

  const getRandomInt = (min, max) => {
    // min and max must be integers
    // min and max are inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Start new game
  // when the page loads for the first time
  // and also when the state of gameNumber has changed
  const gameNumber = useSelector(state => state.gameplay.gameNumber);
  useEffect(() => {
    if (wordsStatus === 'idle') {
      const randomWordId = wordIds[getRandomInt(0, wordIds.length - 1)];
      const nextWord = words[randomWordId];
      dispatch(setupNewGame(nextWord));
    }
  }, [gameNumber, wordsStatus, words, wordIds, dispatch]);

  // Start new game on button click
  const handleOnClickNewGame = () => {
    // Changes the state of gameNumber which runs the useEffect hook above
    dispatch(startNewGame());
  }

  return (
    <>
      {(wordsStatus === 'idle') &&
        <>
          <div className="status-bar">
            <Lives />
            <div className="status-bar__right">
              <EndGame />
              <InfoModal />
            </div>
          </div>
          <CurrentWord />
          <Keypad />
          <div className="container">
            <button className="button new-game-btn" onClick={handleOnClickNewGame} type="button">New Game</button>
          </div>
        </>}
      {(wordsStatus === 'loading') && <div className='container loading-status'>Loading...</div>}
      {(wordsStatus === 'failed') && <div className='container loading-status'>Failed to connect. Refresh to try again.</div>}
    </>
  );
}

export default App;