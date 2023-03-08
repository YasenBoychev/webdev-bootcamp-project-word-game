import './endgame.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import relevant Action creators from gameplaySlice
import { endGame } from '../../store/gameplay/gameplaySlice';

export default function GameOver() {

  const dispatch = useDispatch();

  // Run the useEffect hook when the state of gameLost or gameWon changes
  const gameLost = useSelector(state => state.gameplay.gameLost);
  const gameWon = useSelector(state => state.gameplay.gameWon);

  useEffect(() => {
    if (gameLost) {
      dispatch(endGame());
    }
  }, [gameWon, gameLost, dispatch]);

  return (
    <>
      {gameLost && <div className="end-game">Game Over</div>}
      {gameWon && <div className="end-game">You Won</div>}
    </>
  );
}