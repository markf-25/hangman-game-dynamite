import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"
import Scoreboard from "./components/Scoreboard/Scoreboard"
import SketchButton from './components/SketchButton/SketchButton'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "./reducers/turn.slice.js"
import "wired-elements"


function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showScores, setShowScores] = useState(false)
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
  {gameStarted? <>
  <SketchButton style={{position: "fixed", top:"3rem", left:"2rem"}} text="punteggi" onClick={()=>setShowScores(true)}/>
  <wired-dialog open={showScores}>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1rem"}}>
    <Scoreboard />
  <SketchButton text="bruh" style={{"align-self": "center"}}onClick={()=>setShowScores(false)}/>
    </div>
  </ wired-dialog>
  <Game />
  </>
  :
  <SetupGame startTheGame={setGameStarted}/>}
  {gameOver? <Scoreboard newGame={newGame}/> : null}
  </>
}

export default App
