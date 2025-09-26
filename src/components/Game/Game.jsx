import Gameplay from "../Gameplay/Gameplay"
import SetupGame from "../SetupGame/SetupGame"
import SketchDialog from "../SketchDialog/SketchDialog"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "../../reducers/turn.slice.js"

function Game () {

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)

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
    
    <Gameplay />
    
  </>
  :
    <SetupGame startTheGame={setGameStarted} />}
    {gameOver && 
      <SketchDialog isOpen={true} newGame={newGame} />}

  </>
}

export default Game