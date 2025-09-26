import styles from "./Scoreboard.module.css"

import PlayerScore from "../PlayerScore/PlayerScore"
import CrownComponent from "../CrownComponent/CrownComponent"

import { useSelector } from "react-redux"
import { playersSelector} from "../../reducers/player.slice.js"
import { turnSelector} from "../../reducers/turn.slice.js"

const Scoreboard = () => {

    const playersArray = useSelector(playersSelector)
    const currentTurn = useSelector(turnSelector)
    const reloadsLeft = currentTurn.reloadsLeft

    const sortedPlayersArray = playersArray.toSorted((a, b) => b.score - a.score)

    return <>
    <div className={styles.board}>
        <h2>Classifica</h2>
    {sortedPlayersArray.map(player => 
    <div className={styles.player}>
    {player === sortedPlayersArray[0] && !reloadsLeft && <CrownComponent/>}
    <PlayerScore player={player}/>
    </div>)}
    </div>
    </>
}

export default Scoreboard