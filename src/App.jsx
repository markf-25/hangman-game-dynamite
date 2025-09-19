import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"
import Scoreboard from "./components/Scoreboard/Scoreboard"
import SketchButton from './components/SketchButton/SketchButton'
import SketchDialog from "./components/SketchDialog/SketchDialog"
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
    
  <SketchDialog isOpen={gameOver}>
    <Scoreboard />
  <SketchButton text="bruh" style={{"align-self": "center"}}onClick={()=>gameOver? setGameOver(false) : setShowScores(false)}/>
    </SketchDialog>

  <Game />
  </>
  :
  <SetupGame startTheGame={setGameStarted}/>}
  {gameOver? <Scoreboard newGame={newGame}/> : null}
  </>
}

export default App
