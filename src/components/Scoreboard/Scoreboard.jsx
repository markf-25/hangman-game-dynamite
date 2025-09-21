import styles from "./Scoreboard.module.css"

import PlayerScore from "../PlayerScore/PlayerScore"
import SketchButton from "../SketchButton/SketchButton"
import { useSelector } from "react-redux"
import { playersSelector} from "../../reducers/player.slice.js"

const Scoreboard = () => {

    const playersArray = useSelector(playersSelector)

    const sortedPlayersArray = playersArray.toSorted((a, b) => b.score - a.score)

    return <>
    <div className={styles.board}>
        <h2>Classifica</h2>
    {sortedPlayersArray.map(player => <PlayerScore player={player}/>)}
    </div>
    </>
}

export default Scoreboard