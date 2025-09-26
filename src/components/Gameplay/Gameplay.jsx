import Errors from "../Errors/Errors.jsx"
import Word from "../Word/Word.jsx"
import Keyboard from "../Keyboard/Keyboard.jsx"
import PlayerScore from "../PlayerScore/PlayerScore.jsx"
import { useSelector} from "react-redux"
import { playerSelectorById } from "../../reducers/player.slice.js"
import { turnSelector } from "../../reducers/turn.slice.js"
import { useState, useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import SketchButton from '../SketchButton/SketchButton'
import SketchDialog from "../SketchDialog/SketchDialog"

import styles from "./Gameplay.module.css"

const Gameplay = () => {
  const currentTurn = useSelector(turnSelector)
  const currentPlayerId = currentTurn.currentPlayerId
  const player = useSelector(playerSelectorById(currentPlayerId))

    const {setView} = useContext(GameContext);
    const [showScores, setShowScores] = useState(false)

   return <div className={styles.gameplay_wrapper}>

    <div className={styles.points_button}>
      <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Punteggi" onClick={()=>setShowScores(true)}/>
     <PlayerScore player={player}/>
      <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Esci dal gioco" onClick={()=>setView("start")}/>
    </div>
      <Word currentTurn={currentTurn} currentPlayerId={currentPlayerId}/>
      <div className={styles.keyboardErrorsWrapper}>
      <Keyboard />
      <Errors/> 
      </div>
      <hr/>
      <footer>© 2025 - M&N Group</footer>
      <SketchDialog isOpen={showScores} onClose={()=> setShowScores(false)} />
    </div>
}

export default Gameplay