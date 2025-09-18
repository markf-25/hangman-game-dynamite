import useInput from "../../hooks/useInput"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"
import { COLORS } from "../../utils/constants.js"
import styles from "./PlayerModal.module.css"

import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

const PlayerModal = ({player, ready}) => {

    const dispatch = useDispatch()

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const [isDisabled, setIsDisabled] = useState(false)
    const [color, setColor] = useState("#A3C4FF")

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
        <label htmlFor={`username${player}`}>Username:</label>
        <wired-input
          id={`username${player}`}
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor={`color${player}`}>Scegli un colore:</label>
        {COLORS.map(singleColor => <button className={styles.colorButton}
         id={`color${player}`}
         type="button"
         style={{ backgroundColor: singleColor }}
          value={singleColor}
          onClick={()=> setColor(singleColor)}/>)}

        <SketchButton type="submit" disabled={isDisabled} text="Pronto!"/>
      </form>
    </div>
    </SketchWrapper>
</>
}

export default PlayerModal