import { createContext, useState, useEffect } from "react";
import { getWord } from "../services/word.service.js";

export function GameProvider({ children }) {
  const emptyChar = " ";
  const [userGuesses, setUserGuesses] = useState([emptyChar]);
  const [ errors, setErrors ] = useState(0)
  const [word, setWord] = useState("");

  const [reset, setReset] = useState(false)

  const fetchWord = async () => {
    const newWord = await getWord();
    setWord(newWord);
    setReset(false)
  };

  return (
    <GameContext.Provider
      value={{ emptyChar, userGuesses, setUserGuesses, word, setWord, errors, setErrors, reset, setReset, fetchWord }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameContext = createContext();
