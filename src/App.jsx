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
    console.log("le robe poi", gameStarted, gameOver)
  },[reloadsLeft])

  const newGame = () => {
    console.log("le robe all'inizio", gameStarted, gameOver)
  setGameStarted(false)
  setGameOver(false)
    console.log("le robe all'inizio pt 2", gameStarted, gameOver)
  }

  return <>
  {gameStarted? <>
  <SketchButton style={{position: "fixed", top:"3rem", left:"2rem"}} text="punteggi" onClick={()=>setShowScores(true)}/> 
    
    <SketchDialog isOpen={showScores}>
      <Scoreboard />
      <hr/>
      <SketchButton text="OK" fill="bisque" style={{alignSelf: "center", background: "none", padding: "0px 12px"}}onClick={()=> setShowScores(false)}/>
    </SketchDialog>

    <Game />
  </>
  :
    <SetupGame startTheGame={setGameStarted} />}
    {gameOver && 
      <SketchDialog isOpen={true}>
        <Scoreboard newGame={newGame} />
      </SketchDialog>}
  </>
}

export default App
