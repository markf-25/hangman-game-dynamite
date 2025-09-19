import styles from "./Scoreboard.module.css"

import PlayerScore from "../PlayerScore/PlayerScore"
import SketchButton from "../SketchButton/SketchButton"
import { useSelector } from "react-redux"
import { playersSelector} from "../../reducers/player.slice.js"

const Scoreboard = ({newGame}) => {

    const playersArray = useSelector(playersSelector)

    const sortedPlayersArray = playersArray.toSorted((a, b) => b.score - a.score)

    return <>
    <div className={styles.board}>
        <h2>Classifica</h2>
    {sortedPlayersArray.map(player => <PlayerScore player={player}/>)}
    </div>
    {newGame? <SketchButton text="Nuova partita?" style={{background: "none", padding: "2px 10px"}} fill="bisque" onClick={newGame}></SketchButton> : null}
    </>
}

export default Scoreboard