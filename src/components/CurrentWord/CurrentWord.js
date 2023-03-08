// This component displays the current word on the screen

import './currentword.css';
import { useSelector } from 'react-redux';

function CurrentWord() {

  // Get the current word letters
  const wordLetters = useSelector(state => state.gameplay.wordLetters);

  // Letter positions
  const letterPositions = Object.keys(wordLetters);

  return (
    <ul className="container current-word">
      {letterPositions.map(position => {
        let letter = wordLetters[position].letter;
        let revealed = wordLetters[position].revealed;

        return <li key={position}>{revealed ? letter : "_"}</li>;
      })}
    </ul>
  );
}

export default CurrentWord;