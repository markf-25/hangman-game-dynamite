import { createContext, useState, useEffect } from "react";
import { getWord } from "../services/word.service.js";

export function GameProvider({ children }) {
  const emptyChar = " ";
  const [userGuesses, setUserGuesses] = useState([emptyChar]);
  const [ errors, setErrors ] = useState(0)
  const [word, setWord] = useState("");

  const fetchWord = async () => {
    const newWord = await getWord();
    setWord(newWord);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <GameContext.Provider
      value={{ userGuesses, setUserGuesses, word, setWord, errors, setErrors }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameContext = createContext();
