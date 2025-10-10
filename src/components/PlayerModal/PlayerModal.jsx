import useInput from "../../hooks/useInput"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"
import { COLORS, MAXUSERNAMELENGTH } from "../../utils/constants.js"
import styles from "./PlayerModal.module.css"

import { useRef } from "react"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"
import SketchInput from "../SketchInput/SketchInput"

import { useTranslation } from "react-i18next";

const PlayerModal = ({player, ready}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const radioRefs = useRef({})

    const {value: username, handleChange: handleUsernameChange } = useInput(`${t("player")} ${player}`)

    const [playerIsReady, setPlayerIsReady] = useState(false)

    const isDisabled = playerIsReady || !username.length

    const [color, setColor] = useState("#A3C4FF")

     useEffect(() => {
      // Aggiorna manualmente la proprietà checked
      COLORS.forEach(singleColor => {
        const ref = radioRefs.current[singleColor]
        if (ref) {
          ref.checked = (color === singleColor)
        }
      })
    }, [color]) 

    const setupNewPlayer = (e) => {

        e.preventDefault() 

      if(!username) {
        return
      }

        const payload = {
        id: player,
        username: username.trim(),
        color,
        score: 0
        }
        
        dispatch(setPlayers(payload))
        ready((prev) => prev+1)
        setPlayerIsReady(true)
    }

return <>
<SketchWrapper fill={color}>
<div className={styles.player_modal}>
      <h3>{t("player")} {player}</h3>
      <form onSubmit={setupNewPlayer} className={styles.player_form}>
        <div className={styles.player_name}>
        <label htmlFor={`username${player}`}>{t("username")}:</label>
        <SketchInput 
        fill="white" 
        stroke ="white" 
        id={`username${player}`}
        value={username}
        onChange={!playerIsReady? handleUsernameChange : null}
        maxLength={MAXUSERNAMELENGTH}/>
        
        <p style={{color: !username? "red" : "inherit" }}>{username.length}/{MAXUSERNAMELENGTH}</p>
        </div>
    <div className={styles.color_choice}>
        <label className={styles.color_label} htmlFor={`color${player}`}>{t("select color")}</label>
<div className={styles.color_container}>
  
  {COLORS.map(singleColor => <SketchButton className={styles.colorButton}
      key={singleColor}
         id={`color${player}`}
         type="button"
          value={singleColor}
          shape="circle"
          stroke={{state: color, value: singleColor, color: "white"}}
          fill={{ color: singleColor, isDisabled: singleColor !== color && playerIsReady }}
          disabled={playerIsReady}
          onClick={()=> setColor(singleColor)}/>)}
  
</div>
</div>
        <SketchButton fill={{isDisabled, color: "white"}} className={styles.ready_btn} type="submit" disabled={isDisabled} text={t("ready")}/>
      </form>
    </div>
    </SketchWrapper>
</>
}

export default PlayerModal