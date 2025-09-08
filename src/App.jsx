import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"

import { useState } from "react"


function App() {

  const [startTheGame, setStartTheGame] = useState(false)

  return <>
  {startTheGame? 
  <Game />
  :
  <SetupGame startTheGame={setStartTheGame}/>}
  </>
}

export default App
