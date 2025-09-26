import Errors from "../Errors/Errors.jsx"
import Word from "../Word/Word.jsx"
import Keyboard from "../Keyboard/Keyboard.jsx"
import PlayerScore from "../PlayerScore/PlayerScore.jsx"
import { useSelector} from "react-redux"
import { playerSelectorById } from "../../reducers/player.slice.js"
import { turnSelector } from "../../reducers/turn.slice.js"
import { useState } from "react"
import SketchButton from '../SketchButton/SketchButton'
import SketchDialog from "../SketchDialog/SketchDialog"

import styles from "./Gameplay.module.css"

const Gameplay = () => {
  const currentTurn = useSelector(turnSelector)
  const currentPlayerId = currentTurn.currentPlayerId
  const player = useSelector(playerSelectorById(currentPlayerId))
    const [showScores, setShowScores] = useState(false)

    return <div className={styles.gameplay_wrapper}>
       <div className={styles.side_buttons}>
    <SketchButton fill={{color: "lightcyan"}} style={{background: "none"}} text="Punteggi" onClick={()=>setShowScores(true)}/>
     <PlayerScore player={player}/>
    </div>
      <Errors/>
      <Word currentTurn={currentTurn} currentPlayerId={currentPlayerId}/>
      <Keyboard />
      <SketchDialog isOpen={showScores} onClose={()=> setShowScores(false)} />
    </div>
}

export default Gameplay