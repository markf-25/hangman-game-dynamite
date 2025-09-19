import useInput from "../../hooks/useInput"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"
import { COLORS } from "../../utils/constants.js"
import styles from "./PlayerModal.module.css"
import "wired-elements"
import { useRef } from "react"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

const PlayerModal = ({player, ready}) => {

    const dispatch = useDispatch()

    const radioRefs = useRef({})

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const [isDisabled, setIsDisabled] = useState(false)
    const [color, setColor] = useState("#A3C4FF")

    const getFill = (singleColor) => {
  if (isDisabled && singleColor === color) return singleColor;
  if (isDisabled) return "grey";
  return singleColor;
};

  const getStroke = (singleColor) => {
    if (singleColor === color) return "white";
    return "transparent";
  }

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

        const payload = {
        id: player,
        username,
        color,
        score: 0
        }
        
        dispatch(setPlayers(payload))
        console.log("Nuovo player aggiunto:", payload)
        ready((prev) => prev+1)
        setIsDisabled(true)
    }

    useEffect(()=>{console.log("PAPPPAEEREREREREERE", color)}, [color])

return <>
<SketchWrapper fill={color}>
<div className={styles.player_modal}>
      <h3>Player {player}</h3>
      <form onSubmit={setupNewPlayer} className={styles.player_form}>
        <div className={styles.player_name}>
        <label htmlFor={`username${player}`}>Username:</label>
        <wired-input
          id={`username${player}`}
          value={username}
          onChange={handleUsernameChange}
          style={{ alignSelf : "flex-start" }}
        />
        </div>
        <label className={styles.color_label} htmlFor={`color${player}`}>Scegli un colore:</label>
<div className={styles.color_container}>
  
  {COLORS.map(singleColor => <SketchButton className={styles.colorButton}
         id={`color${player}`}
         type="button"
          value={singleColor}
          shape="circle"
          stroke={getStroke(singleColor)}
          fill={getFill(singleColor)}
          disabled={isDisabled}
          onClick={()=> setColor(singleColor)}/>)}
  
</div>


        <SketchButton fill="white" className={styles.ready_btn} type="submit" disabled={isDisabled} text="Pronto!"/>
      </form>
    </div>
    </SketchWrapper>
</>
}

export default PlayerModal