import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getWord } from "../services/word.service.js";
import { playerSelectorById } from "../reducers/player.slice.js"

export function GameProvider({ children }) {
  const emptyChar = " ";
  const [userGuesses, setUserGuesses] = useState([emptyChar]);
  const [ errors, setErrors ] = useState(0)
  const [word, setWord] = useState("");

  const [reset, setReset] = useState(false)

  const [playerId, setPlayerId] = useState(1)

  const currentPlayer = useSelector(playerSelectorById(playerId));

  const fetchWord = async () => {
    const newWord = await getWord();
    setWord(newWord);
  };

  const newTurn = () => {
    setErrors(0);
    setUserGuesses([emptyChar]);
    fetchWord();
    console.log("DOPO FETCh", errors, userGuesses)
  }

  return (
    <GameContext.Provider
      value={{ emptyChar, userGuesses, setUserGuesses, currentPlayer, playerId, setPlayerId, word, setWord, errors, setErrors, reset, setReset, newTurn }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameContext = createContext();
