import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./Playerscore.module.css"

const PlayerScore = ({player}) => {
    return <div className={styles.playerInfo}>
        <SketchWrapper fill={player.color}>
        <p>{player.username}</p>
        </SketchWrapper>
        <p>{player.score} PUNTI</p> 
    </div>
}
export default PlayerScore