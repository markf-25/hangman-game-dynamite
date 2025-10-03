import Gameplay from "../Gameplay/Gameplay"
import SetupGame from "../SetupGame/SetupGame"
import SketchDialog from "../SketchDialog/SketchDialog"
import { useState, useEffect, useContext } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "../../reducers/turn.slice.js"
import { GameContext } from "../../context/GameProvider"

function Game () {

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const { setView } = useContext(GameContext)

  const currentTurn = useSelector(turnSelector)
  const reloadsLeft = currentTurn.reloadsLeft

useEffect(() => {
  if (gameStarted && !reloadsLeft) {
    const timer = setTimeout(() => {
      setGameOver(true);
      
    }, 3300);
    return () => clearTimeout(timer);
  }
}, [reloadsLeft]);

  const newGame = () => {
  setGameStarted(false)
  setGameOver(false)
  setView("start")
  }

  return <>
  
  {gameStarted? <>
    
    <Gameplay />
    
  </>
  :
    <SetupGame startTheGame={setGameStarted} />}
    {gameOver && 
      <SketchDialog isOpen={true} dialogPurpose="scoreboard" confirmAction={newGame} />}

  </>
}

export default Game