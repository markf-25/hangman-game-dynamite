import { createContext, useState } from "react"

export function GameProvider({ children }) {
  const [userGuesses, setUserGuesses] = useState([])
  const [word, setWord] = useState()

  return (
    <GameContext.Provider value={{ userGuesses, setUserGuesses, word }}>
      {children}
    </GameContext.Provider>
  )
}

export const GameContext = createContext()