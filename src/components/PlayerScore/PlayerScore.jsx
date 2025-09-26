import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./Playerscore.module.css"

const PlayerScore = ({player}) => {
    return <div className={styles.playerInfo}>

        <p className={styles.name}>{player.id} - {player.username}</p>

        <p>{player.score} PUNTI</p> 
    </div>
}
export default PlayerScore