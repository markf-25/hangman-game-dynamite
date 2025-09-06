import { createContext, useState, useEffect } from "react";
import { getWord } from "../services/word.service.js";

export function GameProvider({ children }) {
  const emptyChar = " ";
  const [userGuesses, setUserGuesses] = useState([emptyChar]);
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
      value={{ userGuesses, setUserGuesses, word, setWord }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const GameContext = createContext();
