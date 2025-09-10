import styles from "./Playerscore.module.css"
const PlayerScore = ({player}) => {
    return <div className={styles.playerInfo}>
        <p>{player.username}</p>
        <p>{player.score} PUNTI</p> 
    </div>
}
export default PlayerScore