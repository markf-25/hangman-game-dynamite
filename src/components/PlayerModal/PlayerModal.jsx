import useInput from "../../hooks/useInput"
import { useState, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"
import { COLORS, MAXUSERNAMELENGTH } from "../../utils/constants.js"
import styles from "./PlayerModal.module.css"

import { useRef } from "react"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

const PlayerModal = ({player, ready}) => {

    const dispatch = useDispatch()

    const radioRefs = useRef({})

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const [isDisabled, setIsDisabled] = useState(false)

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

/*     useEffect(()=>{
      setHandleValueChange(prev => [prev, ...username])
      console.log("sadsda")
    },[username]) */
  

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
        setIsDisabled(true)
    }

return <>
<SketchWrapper fill={color}>
<div className={styles.player_modal}>
      <h3>Player {player}</h3>
      <form onSubmit={setupNewPlayer} className={styles.player_form}>
        <div className={styles.player_name}>
        <label htmlFor={`username${player}`}>Username:</label>
        <SketchWrapper fill="white" stroke="white">
        <input
          id={`username${player}`}
          value={username}
          onChange={handleUsernameChange}
          maxlength={MAXUSERNAMELENGTH}
        />
        </SketchWrapper>
        <p style={{color: !username? "red" : "inherit" }}>{username.length}/{MAXUSERNAMELENGTH}</p>
        </div>
    <div className={styles.color_choice}>
        <label className={styles.color_label} htmlFor={`color${player}`}>Scegli un colore:</label>
<div className={styles.color_container}>
  
  {COLORS.map(singleColor => <SketchButton className={styles.colorButton}
      key={singleColor}
         id={`color${player}`}
         type="button"
          value={singleColor}
          shape="circle"
          stroke={{state: color, value: singleColor, color: "white"}}
          fill={{ color: singleColor, isDisabled: singleColor !== color && isDisabled }}
          disabled={isDisabled}
          onClick={()=> setColor(singleColor)}/>)}
  
</div>
</div>
        <SketchButton fill={{isDisabled, color: "white"}} className={styles.ready_btn} type="submit" disabled={isDisabled} text="Pronto!"/>
      </form>
    </div>
    </SketchWrapper>
</>
}

export default PlayerModal