import Errors from "../Errors/Errors"
import Word from "../Word/Word"
import Keyboard from "../Keyboard/Keyboard"
import PlayerScore from "../PlayerScore/PlayerScore"
import { useSelector} from "react-redux"
import { playerSelectorById } from "../../reducers/player.slice.js"
import { turnSelector } from "../../reducers/turn.slice.js"

import styles from "./Game.module.css"

const Game = () => {
  const currentTurn = useSelector(turnSelector)
  const currentPlayerId = currentTurn.currentPlayerId
  const player = useSelector(playerSelectorById(currentPlayerId))

    return <div className={styles.gameWrapper}>
     <PlayerScore player={player}/>

      <Errors/>
      <Word currentTurn={currentTurn} currentPlayerId={currentPlayerId}/>
      <Keyboard />
    </div>
}

export default Game