// This component, together with LetterButton, renders the UI alphabet

import './keypad.css';
import { useSelector } from 'react-redux';

import LetterButton from '../LetterButton/LetterButton';

function Keypad() {

  // Get the alphabet
  const alphabet = useSelector(state => state.gameplay.alphabet);
  const alphabetIDs = Object.keys(alphabet);

  return (
    <div className="container keypad">
      {alphabetIDs.map(id => {
        return <LetterButton key={id} id={id} character={alphabet[id].character} guess={alphabet[id].guess} />;
      })}
    </div>
  );
}

export default Keypad;