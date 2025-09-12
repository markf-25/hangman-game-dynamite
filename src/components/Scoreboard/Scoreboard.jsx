import styles from "./Scoreboard.module.css"

import PlayerScore from "../PlayerScore/PlayerScore"

import { useSelector } from "react-redux"
import { playersSelector} from "../../reducers/player.slice.js"

const Scoreboard = ({newGame}) => {

    const playersArray = useSelector(playersSelector)

    const sortedPlayersArray = playersArray.toSorted((a, b) => b.score - a.score)

    return <>
    <div className={styles.board}>
    {sortedPlayersArray.map(player => <PlayerScore player={player}/>)}
    </div>
    {newGame? <button onClick={newGame}>RICOMINCIA?</button> : null}
    </>
}

export default Scoreboard