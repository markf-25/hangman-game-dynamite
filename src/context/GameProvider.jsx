import { createContext, useState } from "react";
import { useSelector } from "react-redux"
import { getWord } from "../services/word.service.js";
import { playerSelectorById } from "../reducers/player.slice.js"
import { UNREQUIRED_CHARS } from "../utils/constants.js"

export function GameProvider({ children }) {

  const [view, setView] = useState("language");

  const [userGuesses, setUserGuesses] = useState([...UNREQUIRED_CHARS]);
  const [ errors, setErrors ] = useState(0)
  const [word, setWord] = useState("");

  const [reset, setReset] = useState(false)

  const [playerId, setPlayerId] = useState(1)

  const currentPlayer = useSelector(playerSelectorById(playerId));

  function accentsToApostrophe(word) {
  return word
    .normalize("NFD")                // separa lettera + accento
    .replace(/[\u0300-\u036f]/g, "'"); // sostituisce ogni accento nel range della regex con '
}

  const fetchWord = async () => {
    const newWord = await getWord();
    const newWordWithoutAccents = accentsToApostrophe(newWord)
    setWord(newWordWithoutAccents);
  };

  const newTurn = () => {
    setErrors(0);
    setUserGuesses([...UNREQUIRED_CHARS]);
    fetchWord();
  }

  return (
    <GameContext.Provider
      value={{view, setView, userGuesses, setUserGuesses, currentPlayer, playerId, setPlayerId, word, setWord, errors, setErrors, reset, setReset, newTurn }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameContext = createContext();
