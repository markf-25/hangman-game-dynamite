import styles from "./Playerscore.module.css"
import { useTranslation } from "react-i18next";


const PlayerScore = ({player, purpose = "scoreboard"}) => {

    const { t } = useTranslation();

    return <div className={`${styles.playerInfo} ${styles[`playerInfo_${purpose}`]}`}>

        <p style={{boxShadow: `inset 0 5em 0 ${player.color}`, padding: "2px 10px"}}>{player.id}. {player.username}</p>

        <p>{player.score} {t("points")}</p> 
    </div>
}
export default PlayerScore