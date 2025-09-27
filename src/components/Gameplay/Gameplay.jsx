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
    const [confirm, setConfirm] = useState(false)

   return <div className={styles.gameplay_wrapper}>

    <div className={styles.header}>
      <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Punteggi" onClick={()=>setShowScores(true)}/>
     <PlayerScore player={player} purpose="gameHeader"/>
      <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Torna al menù" onClick={()=>setConfirm(true)}/>
    </div>
      <Word currentTurn={currentTurn} currentPlayerId={currentPlayerId}/>
      <div className={styles.keyboardErrorsWrapper}>
      <Keyboard />
      <Errors/> 
      </div>
      <hr/>
      <footer>© 2025 - M&N Group</footer>
      <SketchDialog isOpen={showScores || confirm} dialogPurpose={showScores? "scoreboard" : "confirm dialog"} message={confirm? "Sei sicuro di voler tornare al menù?" : null } newGame={confirm? ()=> setView("start") : null }onClose={()=> showScores? setShowScores(false) : setConfirm(false)}/>
    </div>
}

export default Gameplay