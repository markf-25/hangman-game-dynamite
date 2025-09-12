import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"
import Scoreboard from "./components/Scoreboard/Scoreboard"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "./reducers/turn.slice.js"


function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const currentTurn = useSelector(turnSelector)
  const reloadsLeft = currentTurn.reloadsLeft

  useEffect(()=>{
    if(gameStarted && !reloadsLeft) {
      setGameOver(true)
    }
  },[reloadsLeft])

  const newGame = () => {
  setGameStarted(false)
  setGameOver(false)
  }

  return <>
  {gameStarted? 
  <Game />
  :
  <SetupGame startTheGame={setGameStarted}/>}
  {gameOver? <Scoreboard newGame={newGame}/> : null}
  </>
}

export default App
