import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"
import SketchButton from './components/SketchButton/SketchButton'
import SketchDialog from "./components/SketchDialog/SketchDialog"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "./reducers/turn.slice.js"


function App() {

   const [view, setView] = useState("loading");

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showScores, setShowScores] = useState(false)
  const currentTurn = useSelector(turnSelector)
  const reloadsLeft = currentTurn.reloadsLeft

useEffect(() => {
  if (gameStarted && !reloadsLeft) {
    const timer = setTimeout(() => {
      setGameOver(true);
    }, 3005);
    return () => clearTimeout(timer);
  }
}, [reloadsLeft]);

  const newGame = () => {
  setGameStarted(false)
  setGameOver(false)
  }

  return <>
  
  {gameStarted? <>
  <div style={{position: "fixed", top:"3rem", left:"2rem"}}>
  <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Punteggi" onClick={()=>setShowScores(true)}/>
  </div>
    
    <SketchDialog isOpen={showScores} onClose={()=> setShowScores(false)} />

    <Game />
    
  </>
  :
    <SetupGame startTheGame={setGameStarted} />}
    {gameOver && 
      <SketchDialog isOpen={true} newGame={newGame} />}

  </>
}

export default App
