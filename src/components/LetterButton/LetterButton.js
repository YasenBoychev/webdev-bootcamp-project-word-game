// This component renders a UI alphabet button

import './letterbutton.css';
import { useSelector, useDispatch } from 'react-redux';

// Import relevant Action creators from gameplaySlice
import { makeGuess } from '../../store/gameplay/gameplaySlice';

export default function LetterButton({ id, character }) {

  const dispatch = useDispatch();

  // Make character guess
  const handleOnClick = () => {
    dispatch(makeGuess(character));
  }

  let btnClasses = ["button", "letter-button"];

  // Subscribe to changes in alphabet[id].guess
  const guess = useSelector(state => state.gameplay.alphabet[id].guess);
  if (guess === true) {
    btnClasses.push("correct-guess");
  }
  if (guess === false) {
    btnClasses.push("wrong-guess");
  }

  // Check if button is disabled
  // Gets values and subscribes to changes
  const gameLost = useSelector(state => state.gameplay.gameLost);
  const gameWon = useSelector(state => state.gameplay.gameWon);

  let btnDisabled;
  if (gameLost || gameWon) {
    // If the game is lost or won
    btnDisabled = true; // Disable the button
    if (guess === null) {
      // If the button was not pressed before apply styling
      btnClasses.push("letter-button--disabled");
    }
  }
  else if (guess !== null) {
    // Player is still playing and the botton has been clicked
    btnDisabled = true;
  } else {
    // Player is still playing and the button has not been clicked
    btnDisabled = false;
  }

  return (
    <button
      onClick={handleOnClick}
      type="button"
      className={btnClasses.join(" ")}
      disabled={btnDisabled}
    >
      {character}
    </button>
  );
}