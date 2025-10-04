import styles from "./Scoreboard.module.css"

import PlayerScore from "../PlayerScore/PlayerScore"
import CrownComponent from "../CrownComponent/CrownComponent"

import { useSelector } from "react-redux"
import { playersSelector} from "../../reducers/player.slice.js"
import { turnSelector} from "../../reducers/turn.slice.js"

import { useTranslation } from "react-i18next";

const Scoreboard = () => {

    const { t } = useTranslation();

    const playersArray = useSelector(playersSelector)
    const currentTurn = useSelector(turnSelector)
    const reloadsLeft = currentTurn.reloadsLeft

    const sortedPlayersArray = playersArray.toSorted((a, b) => b.score - a.score)

    const winnerScore = sortedPlayersArray[0]?.score ?? 0

    return <>
    <div className={styles.board}>
        {playersArray.length > 1? <h2>{t("scoreboard_plural")}</h2> : <h2>{t("scoreboard")}</h2>}
    {sortedPlayersArray.map(player => 
    <div className={styles.player}>
    {player.score === winnerScore && sortedPlayersArray.length>1 && !reloadsLeft && <CrownComponent/>}
    <PlayerScore player={player}/>
    </div>)}
    </div>
    </>
}

export default Scoreboard